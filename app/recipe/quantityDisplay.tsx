'use client'

import { FormattedQuantity } from "../utilities/unitConversion"

export type QuantityDisplayProps = {
    value: FormattedQuantity
    /** className applied to the whole-number part */
    wholeClassName?: string
    /** className applied to the fraction (numerator/denominator) part */
    fractionClassName?: string
}

/**
 * Renders a { whole, fraction } quantity as a proper stacked fraction
 * (numerator over denominator, separated by a rule) instead of slash text
 * or a tiny Unicode glyph. Slash text ("1 1/4") reads as one run-together
 * number at a glance, and Unicode vulgar fractions (¼, ½, ¾) render too
 * small/blurry in most fonts. Whole and fraction parts are exposed via
 * `wholeClassName`/`fractionClassName` so callers can style each independently.
 */
const QuantityDisplay = ({ value, wholeClassName, fractionClassName }: QuantityDisplayProps) => {
    const { whole, fraction } = value

    if (!fraction) {
        return <span className={wholeClassName}>{whole}</span>
    }

    return (
        <span className="inline-flex items-center">
            { whole && <span className={`mr-[0.15em] ${wholeClassName ?? ''}`}>{whole}</span> }
            <span className={`inline-flex flex-col font-normal ${ whole ? '' : '-pt-4' } ${fractionClassName ?? ''}`}>
                <span className="border-b border-current px-[0.1em]">{fraction.numerator}</span>
                <span className="px-[0.1em]">{fraction.denominator}</span>
            </span>
        </span>
    )
}

export default QuantityDisplay
