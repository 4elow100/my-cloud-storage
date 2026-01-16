import {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.js";
import getCookie from "../utils/getCookie.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/user/me`, {credentials: "include"})
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .finally(() => setLoading(false))
  }, [])

  const registration = async (data) => {
    const res = await fetch(`${API_BASE_URL}/user/registration/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Ошибка регистрации")

    await login(data['username'], data['password'])
  }

  const login = async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/user/login/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({username, password})
    })
    if (!res.ok) throw new Error("Ошибка входа")

    const me = await fetch(`${API_BASE_URL}/user/me`, {credentials: "include"}).then(r => r.json())
    setUser(me)
  }

  const logout = async () => {
    const csrftoken = getCookie("csrftoken")

    await fetch(`${API_BASE_URL}/user/logout/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken
      },
      credentials: "include"
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, loading, login, logout, registration}}>
      {children}
    </AuthContext.Provider>
  )
}