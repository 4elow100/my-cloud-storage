import {ListRow} from "./ListRow.jsx";

export const ListView = ({data}) => {
    return (
        <>
            <header className="table-header">
                <div className="table-header-name">Название</div>
                <div className="table-header-size">Размер</div>
                <div className="table-header-uploaded">Дата изменения</div>
                <div className="table-header-downloaded">Дата последнего скачивания</div>
                <div className="table-header-comment">Комментарий</div>
            </header>
            <div className="table-content">
                {data.map(item => (
                    <ListRow key={item.id} item={item}/>
                ))}
            </div>
        </>
    )
}