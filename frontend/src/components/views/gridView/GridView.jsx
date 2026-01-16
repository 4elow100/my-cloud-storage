import {StorageItem} from "./StorageItem.jsx";

export const GridView = ({data, onContextMenu}) => {
    return (
        <>
            <div className="grid-content">
                {data.map(item => (
                    <StorageItem key={item.id} item={item} onContextMenu={onContextMenu} isFolder={item.isFolder}/>
                ))}
                {Array(15).fill().map(() => (
                    <>
                        <div className="grid-item-empty"></div>
                    </>
                ))}
            </div>
        </>
    )
}