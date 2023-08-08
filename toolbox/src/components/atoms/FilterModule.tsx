import { ReactElement } from "react";

interface TitledChildren {
    title: string
    margin: string
    children?: ReactElement<any>
}

const FilterModule = (props: TitledChildren) => {
    return (
        <div className={`h-auto w-fit text-left ${props.margin}`}>
            <h1 className="font-bold text-lg mb-3 dark:text-dark-white">{props.title}</h1>
            {props.children}
        </div>
    );
}

export default FilterModule;