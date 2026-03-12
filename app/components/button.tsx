

interface InputParams {
    message: string
    func?: () => void
}

export const Button = ( { message, func }: InputParams ) => {

    return (
        <>
            <button className="
            bg-ThymeRootOrangeDarker
            hover:bg-ThymeRootOrangeLighter hover:text-gray-800 transition-all duration-100
            text-black cursor-pointer border-1 border-primary 
            flex justify-center items-center text-center font-semibold h-full w-full py-1
                rounded-lg shadow-lg "
                onClick={ func }
            >
                { message }
            </button>
        </>
    )

}