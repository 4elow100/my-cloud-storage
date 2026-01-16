import {ContextMenu} from "../common/ContextMenu.jsx";

export const FileContextMenu = ({style}) => {
    return (
        <>
            <ContextMenu direction='top' style={style}>
                <div>OPTION1</div>
                <div>OPTION2</div>
                <div>OPTION3</div>
                <div>OPTION4</div>
            </ContextMenu>
        </>
    )
}