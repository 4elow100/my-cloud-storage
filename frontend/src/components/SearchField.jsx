import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export const SearchField = () => {
    return (
        <>
            <div className="search-container">
                <form className="search-form">
                    <button className="search-btn btn" type="submit" title="Search Button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input className="search-input" type="search" name="search-input" placeholder="Поиск по названию..."
                           aria-label="Search Input Field"/>
                </form>
            </div>
        </>
    )
}