interface title {
    size: string;
    heading?: string;
    span?: string;
    mid?: string;
    span2?: string;
    tail?: string;
    description?: string;
}

const Title = (props: title) => {
    return (<div id="c_wrapper" className='max-w-3xl text-left mt-10 mb-5'>
        <h1 className={`mb-4 dark:text-white ${props.size}`}>
            {props.heading} <span className="bg-pu-gul h-24 inline-block text-black">{props.span}</span>
            {props.mid} <span className="bg-pu-gul h-24 inline-block text-black">{props.span2}</span>
            {props.tail}
        </h1>
        <p className="mb-2 dark:text-dark-ghost">{props.description}</p>
    </div>
    )
}

export default Title;
