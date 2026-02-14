import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import Main from "./main/Main"
import { AuthProvider } from "./context/AuthContext"

function App() {
  const isLoggedIn = !!localStorage.getItem("token") // simple auth check

  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />}/>
    </Routes>
  )
}

export default App
