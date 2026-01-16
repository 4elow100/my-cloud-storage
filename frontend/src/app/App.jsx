import './App.css'
import {MainHeader} from "../components/MainHeader.jsx";
import {Route, Routes} from "react-router-dom";
import RequireAuth from "../components/common/RequireAuth.jsx";
import {HomePage} from "../pages/HomePage.jsx";
import {StoragePage} from "../pages/StoragePage.jsx";

function App() {

  return (
    <>
      <header className="header-container">
        <MainHeader/>
      </header>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/storage" element={
            <RequireAuth>
              <StoragePage/>
            </RequireAuth>
          }/>
        </Routes>
      </main>
    </>
  )
}

export default App
