import { Routes, Route} from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import MainPage from "./components/main/MainPage"
import CreateCategoryPage from "./components/main/CreateCategoryPage"
import StatsPage from "./components/main/StatsPage"
import ListPage from "./components/main/ListPage"
import ProfilePage from "./components/main/ProfilePage"
import CategoryEdit from "./components/main/CategoryEdit"
import ExpenseEdit from "./components/main/ExpenseEdit"
import { Navigate } from "react-router-dom"

import "./index.css"
import { useAuth } from "./components/context/AuthContext"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/auth/login" replace />
}

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Redirect root based on auth state */}
      <Route path="/" element={<Navigate to={user ? "/expense/add-expense" : "/auth/login"} replace />} />

      {/* Protected routes */}
      <Route path="/expense/add-expense" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
      <Route path="/expense/list" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
      <Route path="/expense/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
      <Route path="/expense/categories" element={<ProtectedRoute><CreateCategoryPage /></ProtectedRoute>} />
      <Route path="/expense/categories/:categoryId" element={<ProtectedRoute><CategoryEdit /></ProtectedRoute>} />
      <Route path="/expense/list/:expenseId" element={<ProtectedRoute><ExpenseEdit /></ProtectedRoute>} />
      <Route path="/expense/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Auth routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
