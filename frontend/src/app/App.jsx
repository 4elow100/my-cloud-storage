import './App.css'
import {MainHeader} from "../components/MainHeader.jsx";
import {Route, Routes} from "react-router-dom";
import RequireAuth from "../components/common/RequireAuth.jsx";
import {HomePage} from "../pages/HomePage.jsx";
import {StoragePage} from "../pages/StoragePage.jsx";
import {useContextMenu} from "../providers/contextMenu/useContextMenu.js";
import {ModalsList} from "../components/common/ModalsList.jsx";
import {ContextMenusList} from "../components/common/ContextMenusList.jsx";



function App() {
  const {closeContextMenu, contextMenuType} = useContextMenu()


  const handleClick = (e) => {
    if (!e.target.closest(".context-menu-container") && contextMenuType) {
      closeContextMenu()
    }
  }

  return (
    <div className="app" onClick={handleClick}>
      <header className="header-container">
        <MainHeader/>
      </header>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/storage/*" element={
            <RequireAuth>
              <StoragePage/>
            </RequireAuth>
          }/>
        </Routes>
      </main>

      <ContextMenusList />
      <ModalsList />
    </div>
  )
}

export default App
