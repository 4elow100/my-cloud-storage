import { useAuth } from '../providers/auth/useAuth.js'
import { Logo } from './Logo.jsx'
import { SearchField } from './SearchField.jsx'
import { UserProfileButton } from './buttons/UserProfileButton.jsx'
import { AdminPageButton } from './buttons/AdminPageButton.jsx'

export const MainHeader = () => {
  const { user } = useAuth()

  return (
    <>
      <div className="header-search-area">
        <Logo />
        <SearchField />
      </div>
      <div className="header-user-area">
        {user && user.is_staff && <AdminPageButton />}
        <UserProfileButton />
      </div>
    </>
  )
}
