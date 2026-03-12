import Image from "next/image"

interface InputParams {
    dividerText?: string
}

export const Divider = ({ dividerText }: InputParams) => {
    return (
        <div className='flex flex-row'>
            <Image 
                src={'/static/divider.webp'} 
                width={108}
                height={36}
                className='scale-x-[-1] mt-4 w-auto h-auto'
                alt="divider_Image"
            />
            <p className="text-2xl font-bold p-4 text-primary">{dividerText}</p>
            <Image 
                src={'/static/divider.webp'} 
                width={108}
                height={36}
                className='mt-4 w-auto h-auto'
                alt="divider_Image"
            />
        </div>
    )
}