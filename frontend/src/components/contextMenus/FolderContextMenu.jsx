import {ContextMenu} from "../common/ContextMenu.jsx";

export const FolderContextMenu = ({style}) => {
    return (
        <>
            <ContextMenu direction='top' style={style}>
                <div>OPTION1</div>
                <div>OPTION2</div>
                <div>OPTION33</div>
            </ContextMenu>
        </>
    )
}