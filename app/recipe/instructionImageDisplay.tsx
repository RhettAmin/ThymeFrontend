import { InstructionSection } from "../models/recipe"
import Image from 'next/image'

export type InstructionImageDisplayProps = {
    instructionSections: InstructionSection[]
}

const InstructionImageDisplay = ( { instructionSections } : InstructionImageDisplayProps) => {
    return (
        <div className="bg-card rounded-lg">
            <p className="text-2xl font-bold">Images</p>
            {
                instructionSections.map((instructionSection: InstructionSection, index: number) => (
                    
                    instructionSection.image &&
                    <div key={ index } className={`p-4 mt-4 bg-accent rounded-lg inset-shadow-sm inset-shadow-text `}>
                        <p className="font-bold">{ instructionSection.sectionName }</p>
                        <Image className={`rounded-2xl h-1/2 w-auto`} src={ instructionSection.image }
                            width={150} height={0} alt={ "Image of the Recipe, plated nicely" }
                        />
                    </div>
                    
                ))
            }
        </div>
    )
    
}

export default InstructionImageDisplay