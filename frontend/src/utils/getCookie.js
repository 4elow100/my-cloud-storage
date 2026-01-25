export default function getCookie(name) {
  const cookieString = document.cookie
  const cookies = cookieString.split('; ')

  for (let cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (key === name) return decodeURIComponent(value)
  }

  return null
}
