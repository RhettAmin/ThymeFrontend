import Image from 'next/image'


export type ImageDisplayProps = {
    imageLink: string
}
const ImageDisplay = ({imageLink}: ImageDisplayProps) => {

    return (
        <div className="flex justify-center">
            <Image className="rounded-2xl" src={ imageLink } 
                width={500} height={500} alt={ "Image of the Recipe, plated nicely" } 
                loading="eager"
            />
        </div>
    )
}

export default ImageDisplay