/**
 * Unit conversion utilities for the metric/imperial display toggle.
 * Ported from ThymeCMS's unitConversion.ts, with one addition: conversionType
 * is treated as the source of truth for which unit *family* an ingredient
 * should display in, even when it disagrees with the dimension of the
 * recorded `measurement` string (e.g. "18 grams" tagged conversionType
 * "VOLUME" — a common pattern here, since ingredients are weighed on a
 * scale during recipe development but are meant to be read back as spoons/
 * cups by a home cook). When measurement and conversionType disagree,
 * gram_weight is used as the density (g/ml) bridge between the two; when
 * gram_weight is unset (0), water density (1 g/ml) is used as a fallback,
 * same as ThymeCMS.
 *
 * - conversion_type === "OTHER" (cloves, pods, biscuits, etc.) is never
 *   convertible and is passed through unchanged.
 * - Source figures: USDA ARS Measurement Conversion Tables (MAFCL), Beltsville.
 *
 * Rounding strategy:
 * - All display quantities are snapped to the nearest "cookable" fraction
 *   rather than decimal-rounded. The fraction set varies by unit:
 *     tsp/tbsp  → 1/8, 1/4, 1/2, 3/4 (no 1/3 — not a standard spoon)
 *     cup       → 1/8, 1/4, 1/3, 1/2, 2/3, 3/4 (1/3 cup is a real measure)
 *     oz/lb     → 1/8, 1/4, 1/2 (half-ounce is meaningful; quarter-pound is common)
 *     g/kg/ml/l → 1/16, 1/8, 1/4, 1/2 (metric fractions snap to nearest; floor is 1/16)
 * - Values below the minimum fraction for their unit are clamped to that
 *   minimum (1/16) rather than zeroed. For imperial, values too small to
 *   meaningfully measure (< 1/8 tsp or < 1/8 oz) are displayed as "pinch".
 */

export type ConversionType = "WEIGHT" | "VOLUME" | "OTHER"
export type UnitSystem = "metric" | "imperial"

export type VolumeUnit = "tsp" | "tbsp" | "fl_oz" | "cup" | "pint" | "quart" | "gallon" | "ml" | "l"
export type WeightUnit = "g" | "kg" | "oz" | "lb"

// ── Base-unit conversion factors ────────────────────────────────────────
// Volume base unit: milliliters. Weight base unit: grams.
// "1 unit = X base units"

const VOLUME_TO_ML: Record<VolumeUnit, number> = {
  tsp: 4.92892,
  tbsp: 14.7868,     // = 3 tsp
  fl_oz: 29.5735,    // = 2 tbsp
  cup: 236.588,      // = 8 fl oz
  pint: 473.176,     // = 2 cups
  quart: 946.353,    // = 2 pints
  gallon: 3785.41,   // = 4 quarts
  ml: 1,
  l: 1000,
}

const WEIGHT_TO_G: Record<WeightUnit, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,       // = 16 oz
}

// ── Unit string normalization ───────────────────────────────────────────
// Maps the free-text unit strings stored in recipe_ingredients.measurement
// (plural/singular, abbreviations, full words) to canonical unit keys.

const UNIT_ALIASES: Record<string, VolumeUnit | WeightUnit> = {
  // Volume
  tsp: "tsp", teaspoon: "tsp", teaspoons: "tsp",
  tbsp: "tbsp", tablespoon: "tbsp", tablespoons: "tbsp",
  "fl oz": "fl_oz", floz: "fl_oz", fl_oz: "fl_oz", "fluid ounce": "fl_oz", "fluid ounces": "fl_oz",
  cup: "cup", cups: "cup",
  pint: "pint", pints: "pint", pt: "pint",
  quart: "quart", quarts: "quart", qt: "quart",
  gallon: "gallon", gallons: "gallon", gal: "gallon",
  ml: "ml", millilitre: "ml", millilitres: "ml", milliliter: "ml", milliliters: "ml",
  l: "l", litre: "l", litres: "l", liter: "l", liters: "l",
  // Weight
  g: "g", gram: "g", grams: "g",
  kg: "kg", kilogram: "kg", kilograms: "kg",
  oz: "oz", ounce: "oz", ounces: "oz",
  lb: "lb", lbs: "lb", pound: "lb", pounds: "lb",
}

/**
 * Normalize a free-text unit string (e.g. "litres", "Gram", "Tbsp") to a
 * canonical VolumeUnit/WeightUnit key, or null if unrecognized (e.g. "cloves",
 * "medium", "biscuits" — these belong to conversion_type OTHER).
 */
export function normalizeUnit(raw: string): VolumeUnit | WeightUnit | null {
  const key = raw.trim().toLowerCase()
  return UNIT_ALIASES[key] ?? null
}

function isVolumeUnit(unit: VolumeUnit | WeightUnit): unit is VolumeUnit {
  return unit in VOLUME_TO_ML
}

function isWeightUnit(unit: VolumeUnit | WeightUnit): unit is WeightUnit {
  return unit in WEIGHT_TO_G
}

// ── Same-dimension (exact) conversions ──────────────────────────────────

export function convertVolume(quantity: number, from: VolumeUnit, to: VolumeUnit): number {
  const ml = quantity * VOLUME_TO_ML[from]
  return ml / VOLUME_TO_ML[to]
}

export function convertWeight(quantity: number, from: WeightUnit, to: WeightUnit): number {
  const grams = quantity * WEIGHT_TO_G[from]
  return grams / WEIGHT_TO_G[to]
}

// ── Fraction snapping ───────────────────────────────────────────────────

function snapToFractions(value: number, candidates: number[]): number {
  const whole = Math.floor(value)
  const remainder = value - whole

  let bestFrac = candidates[0]
  let bestDist = Math.abs(remainder - candidates[0])

  for (const frac of candidates) {
    const dist = Math.abs(remainder - frac)
    if (dist < bestDist) {
      bestDist = dist
      bestFrac = frac
    }
  }

  // If snapped to 1, carry over to the whole number
  if (bestFrac === 1) return whole + 1

  // Clamp to minimum fraction (first non-zero candidate) rather than returning 0
  // Only apply the clamp when the whole part is also 0 (a total of 0 is useless)
  if (bestFrac === 0 && whole === 0) return candidates[1] ?? candidates[0]

  return whole + bestFrac
}

// Candidate sets per unit type
const FRACTIONS_TSP_TBSP = [0, 1 / 8, 1 / 4, 1 / 2, 3 / 4, 1]         // no 1/3 tsp
const FRACTIONS_CUP      = [0, 1 / 8, 1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4, 1]
const FRACTIONS_OZ       = [0, 1 / 8, 1 / 4, 1 / 2, 1]
const FRACTIONS_LB       = [0, 1 / 4, 1 / 2, 3 / 4, 1]
const FRACTIONS_METRIC   = [0, 1 / 16, 1 / 8, 1 / 4, 1 / 2, 1]         // floor is 1/16, not 0

/**
 * A snapped quantity split into its whole-number and fraction parts, so a
 * caller can style each part independently (e.g. a smaller stacked fraction
 * next to a normal-sized whole number) instead of parsing a formatted string
 * back apart.
 *
 * `whole` is "" when the value is a fraction with no whole part (e.g. "3/4").
 * `fraction` is undefined when the value has no fractional part, or isn't a
 * recognized cookable fraction (see formatFractionParts).
 */
export interface FormattedQuantity {
  whole: string
  fraction?: { numerator: string, denominator: string }
}

const FRACTION_PARTS: Record<number, { numerator: string, denominator: string }> = {
  0.125: { numerator: "1", denominator: "8" },
  0.25:  { numerator: "1", denominator: "4" },
  0.333: { numerator: "1", denominator: "3" },
  0.5:   { numerator: "1", denominator: "2" },
  0.667: { numerator: "2", denominator: "3" },
  0.75:  { numerator: "3", denominator: "4" },
  0.063: { numerator: "1", denominator: "16" },
}

/**
 * Split a snapped number into whole-number and fraction parts, e.g.
 * 1.25 -> { whole: "1", fraction: { numerator: "1", denominator: "4" } }.
 */
export function formatFractionParts(value: number): FormattedQuantity {
  const whole = Math.floor(value)
  const frac = Math.round((value - whole) * 1000) / 1000  // avoid float noise

  const fraction = FRACTION_PARTS[frac]

  if (whole === 0 && fraction) return { whole: "", fraction }
  if (whole > 0 && fraction) return { whole: `${whole}`, fraction }
  if (frac === 0) return { whole: `${whole}` }

  // Not a recognized cookable fraction. WEIGHT/VOLUME values always land on
  // one of the keys above (they're pre-snapped by snapToFractions), so this
  // path is for conversionType "OTHER" quantities scaled by servings (e.g.
  // 6 pods x 1.125 servings = 6.75, fine, but 0.25 stick x 1.125 = 0.28125,
  // which isn't a standard fraction) - fall back to a rounded decimal rather
  // than silently dropping the fractional part.
  const rounded = Math.round(value * 100) / 100
  return { whole: String(rounded) }
}

/**
 * Format a snapped number into a plain-text display string, e.g. "1 1/4".
 * Use this for plain-text contexts (clipboard copy); use formatFractionParts
 * for on-screen rendering that styles the whole number and fraction separately.
 */
export function formatFraction(value: number): string {
  const { whole, fraction } = formatFractionParts(value)
  if (!fraction) return whole
  const fracStr = `${fraction.numerator}/${fraction.denominator}`
  return whole ? `${whole} ${fracStr}` : fracStr
}

// ── Imperial "pinch" threshold ──────────────────────────────────────────
// Values below these thresholds after unit selection are not practically
// measurable and should show as "pinch" (~0.3g, the smallest meaningful
// kitchen measure). Metric uses fraction-clamping to 1/16 instead.

const IMPERIAL_PINCH_THRESHOLDS: Partial<Record<VolumeUnit | WeightUnit, number>> = {
  tsp: 1 / 8,       // < 1/8 tsp → pinch
  oz:  1 / 8,       // < 1/8 oz (~3.5g) → pinch
}

function isBelowPinchThreshold(quantity: number, unit: VolumeUnit | WeightUnit): boolean {
  const threshold = IMPERIAL_PINCH_THRESHOLDS[unit]
  return threshold !== undefined && quantity < threshold
}

// ── "Nice" display unit selection ───────────────────────────────────────

export function metricVolumeToImperialDisplay(ml: number): { quantity: number, unit: VolumeUnit } | { quantity: number, unit: "pinch" } {
  let quantity: number
  let unit: VolumeUnit

  if (ml < VOLUME_TO_ML.tbsp) {
    quantity = snapToFractions(ml / VOLUME_TO_ML.tsp, FRACTIONS_TSP_TBSP)
    unit = "tsp"
  } else if (ml < VOLUME_TO_ML.tbsp * 4) {
    // Recipes conventionally switch from tbsp to cup fractions around 1/4 cup
    // (4 tbsp) rather than waiting for a full cup - "6 3/4 tbsp" reads far
    // worse than "1/2 cup".
    quantity = snapToFractions(ml / VOLUME_TO_ML.tbsp, FRACTIONS_TSP_TBSP)
    unit = "tbsp"
  } else if (ml < VOLUME_TO_ML.quart) {
    quantity = snapToFractions(ml / VOLUME_TO_ML.cup, FRACTIONS_CUP)
    unit = "cup"
  } else if (ml < VOLUME_TO_ML.gallon) {
    quantity = snapToFractions(ml / VOLUME_TO_ML.quart, FRACTIONS_OZ)
    unit = "quart"
  } else {
    quantity = snapToFractions(ml / VOLUME_TO_ML.gallon, FRACTIONS_OZ)
    unit = "gallon"
  }

  if (isBelowPinchThreshold(quantity, unit)) {
    return { quantity: 1, unit: "pinch" }
  }

  return { quantity, unit }
}

export function metricWeightToImperialDisplay(g: number): { quantity: number, unit: WeightUnit } | { quantity: number, unit: "pinch" } {
  let quantity: number
  let unit: WeightUnit

  if (g < WEIGHT_TO_G.lb) {
    quantity = snapToFractions(g / WEIGHT_TO_G.oz, FRACTIONS_OZ)
    unit = "oz"
  } else {
    quantity = snapToFractions(g / WEIGHT_TO_G.lb, FRACTIONS_LB)
    unit = "lb"
  }

  if (isBelowPinchThreshold(quantity, unit)) {
    return { quantity: 1, unit: "pinch" }
  }

  return { quantity, unit }
}

export function metricVolumeToMetricDisplay(ml: number): { quantity: number, unit: VolumeUnit } {
  if (ml < 1000) {
    return { quantity: snapToFractions(ml, FRACTIONS_METRIC), unit: "ml" }
  }
  return { quantity: snapToFractions(ml / 1000, FRACTIONS_METRIC), unit: "l" }
}

export function metricWeightToMetricDisplay(g: number): { quantity: number, unit: WeightUnit } {
  if (g < 1000) {
    return { quantity: snapToFractions(g, FRACTIONS_METRIC), unit: "g" }
  }
  return { quantity: snapToFractions(g / 1000, FRACTIONS_METRIC), unit: "kg" }
}

// ── Top-level entry point ───────────────────────────────────────────────

export interface DisplayQuantity {
  quantity: number
  unit: string
  // Plain-text formatted quantity (e.g. "1 1/2", "3/4") - use for clipboard/plain contexts.
  display: string
  // Same quantity split into whole/fraction parts - use for on-screen rendering
  // that styles the whole number and fraction differently.
  parts: FormattedQuantity
}

/**
 * Convert a recipe_ingredients (quantity, measurement) pair for live display.
 *
 * conversionType picks the display *family* (VOLUME -> tsp/tbsp/cup/ml/l,
 * WEIGHT -> oz/lb/g/kg). When `measurement`'s own dimension disagrees with
 * conversionType (e.g. "18 grams" tagged VOLUME — weighed for precision but
 * meant to read back as a spoon/cup measure), gramWeight is used as the
 * density (g/ml) bridge between the two. gramWeight of 0/undefined falls
 * back to water density (1 g/ml).
 *
 * - conversion_type "OTHER" -> passed through unchanged (not convertible).
 * - Unrecognized unit strings, or unrecognized conversionType values, are
 *   passed through unchanged rather than throwing, so malformed/legacy data
 *   degrades gracefully.
 */
export function convertForDisplay(
  quantity: number,
  unit: string,
  conversionType: string,
  targetSystem: UnitSystem,
  gramWeight: number = 0
): DisplayQuantity {
  if (conversionType !== "VOLUME" && conversionType !== "WEIGHT") {
    // "OTHER" or any unrecognized value — not convertible
    return { quantity, unit, display: formatFraction(quantity), parts: formatFractionParts(quantity) }
  }

  const normalized = normalizeUnit(unit)
  if (!normalized) {
    // Unrecognized unit string — don't guess, pass through
    return { quantity, unit, display: formatFraction(quantity), parts: formatFractionParts(quantity) }
  }

  // Density bridge for when measurement's dimension disagrees with
  // conversionType (e.g. grams recorded, but meant to display as volume).
  const density = gramWeight > 0 ? gramWeight : 1 // g/ml

  if (conversionType === "VOLUME") {
    const ml = isVolumeUnit(normalized)
      ? convertVolume(quantity, normalized, "ml")
      : convertWeight(quantity, normalized, "g") / density
    const result = targetSystem === "imperial"
      ? metricVolumeToImperialDisplay(ml)
      : metricVolumeToMetricDisplay(ml)
    return { ...result, display: formatFraction(result.quantity), parts: formatFractionParts(result.quantity) }
  }

  // conversionType === "WEIGHT"
  const g = isWeightUnit(normalized)
    ? convertWeight(quantity, normalized, "g")
    : convertVolume(quantity, normalized, "ml") * density
  const result = targetSystem === "imperial"
    ? metricWeightToImperialDisplay(g)
    : metricWeightToMetricDisplay(g)
  return { ...result, display: formatFraction(result.quantity), parts: formatFractionParts(result.quantity) }
}
