'use client'

import { UnitSystem } from "../utilities/unitConversion"

export type UnitSystemToggleProps = {
    unitSystem: UnitSystem
    onChange: (system: UnitSystem) => void
}

const UnitSystemToggle = ({ unitSystem, onChange }: UnitSystemToggleProps) => {
    const isImperial = unitSystem === "imperial"

    return (
        <div className="flex flex-row items-center justify-end mt-5">
            <button
                type="button"
                role="switch"
                aria-checked={isImperial}
                aria-label="Toggle between metric and imperial units"
                onClick={() => onChange(isImperial ? "metric" : "imperial")}
                className="relative inline-flex items-center h-8 w-36 rounded-full bg-brand-wash border border-border-hairline cursor-pointer"
            >
                <span
                    className={`absolute h-8  rounded-full bg-brand shadow-sm transition-transform duration-200 ease-out ${
                        isImperial ? 'translate-x-[4.15rem] w-[5rem]' : 'translate-x-0 w-[4.24rem]'
                    }`}
                />
                <span className={`relative z-10 w-1/2 text-center text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                    isImperial ? 'text-brand-deep' : 'text-white'
                }`}>
                    Metric
                </span>
                <span className={`relative z-10 w-1/2 text-center text-xs font-bold uppercase tracking-[0.1em] transition-colors ${
                    isImperial ? 'text-white' : 'text-brand-deep'
                }`}>
                    Imperial
                </span>
            </button>
        </div>
    )
}

export default UnitSystemToggle
