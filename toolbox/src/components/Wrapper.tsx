// Documentation: use for setup of sections.

// @Properties:
// height = section heigt. Insert 'h-screen' or 'h-auto'
// bg_color = section fill background. Insert 'bg-(...)'
// direction = direction of flex items/children. Insert 'flex-row' for horizontal, and 'flex-column' for vertical
// text_fill = font color

interface section {
    height: string;
    bg_color: string;
    text_fill: string;
    direction: string;
    children: React.ReactNode;
}

const Wrapper = (props: section) => {
    return (
        <section className={`flex flex-col content-center ${props.height} ${props.bg_color} ${props.text_fill}`}>
            <div className={`flex ${props.direction} m-auto w-full max-w-7xl p-10 text-current`}>
                {props.children}
            </div>
        </section>
    )
}

export default Wrapper;