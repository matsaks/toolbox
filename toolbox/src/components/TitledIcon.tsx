interface IconText {
    icon?: string;
    text?: string;
    iconSize?:string;
    textSize?:string;
}

 const TitledIcon = (props : IconText) => { 
    return (
        <div className={`flex flex-row items-center gap-2 ${props.iconSize}`}>
            <img className="h-8 w-auto" src={props.icon} alt="decorative icon" />
            <p className={`${props.textSize}`}>{props.text}</p>
        </div>
    )
}

export default TitledIcon;