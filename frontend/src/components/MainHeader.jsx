import {useAuth} from "../hooks/useAuth.js";
import {Logo} from "./Logo.jsx";
import {useNavigate} from "react-router-dom";
import {UploadFileButton} from "./UploadFileButton.jsx";


export const MainHeader = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const returnToHome = () => {
    navigate("/")
  }
  return (
    <>
      <Logo onClick={returnToHome}/>
      <div className="header-search-container"></div>
      {user && <UploadFileButton/>}
      <div className="header-user-container"></div>
    </>
  )
}
