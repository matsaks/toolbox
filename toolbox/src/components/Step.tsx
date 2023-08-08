interface step {
    nr: string;
    title: string;
    description?: string;
}

const Step = (props: step) => {
    return (
        <div className='flex flex-col w-full h-auto'>
            <div className='flex flex-row w-full gap-5 items-center mb-5'>
                <div className='flex justify-center items-center h-14 w-14 rounded-full bg-black dark:bg-dark-white dark:text-black font-semibold text-white p-5'>
                    <p className='text-2xl'>{props.nr}</p>
                </div>
                <h1 className='text-4xl'>{props.title}</h1>
            </div>
            <p>{props.description}</p>
        </div>
    )
}

export default Step;