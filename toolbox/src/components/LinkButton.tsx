interface Mail {
    href?: string;
    label?: string;
    type?: string;
}

export default function LinkButton(props: Mail) {
    let f = ""
    let icon = ""

    /*
    Dette er en if-setning som sjekker om props.type er lik "mail" eller "phone"
    Dersom den kan sette en prefix til href og en ikon til linken
    Avhengig av om det er en mail, tlf eller link.
    */
    if (props.type === "mail") {
        f = "mailto:"
        icon = "https://img.icons8.com/ios/512/message-squared.png"
    } else if (props.type === "phone") {
        f = "tel:"
        icon = "https://img.icons8.com/ios-glyphs/256/phone.png"
    } else {
        icon = "https://img.icons8.com/ios-filled/256/link.png"
    }

    return (
        <div className="flex items-center gap-2">
            <a href={`${f + props.href}`}>
                <img className="h-10 ml-5" src={icon} alt={props.type} />
            </a>
            {props.label}
        </div>
    );
};