export const ContextMenu = ({children, direction, style}) => {
    return (
        <>
            <div className={"context-menu-container " + direction} style={style}>
                {children}
            </div>
        </>
    )
}