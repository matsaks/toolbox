interface StepContent {
    icon: string
    span: string
    description: string
}

export default function UserStep (props: StepContent) {
    return (
        <div className='w-72 h-auto pr-10 my-5'>
            <img src={props.icon} className="w-11 h-11 bg-contain mb-5" alt="" />
            <p><span className='text-pu-gul font-semibold'>{props.span}</span>{props.description}</p>
        </div>
    )
}
