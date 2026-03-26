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
import CategoryEdit from "./components/CategoryEdit"
import { Navigate } from "react-router-dom"

import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/expense/add-expense" element={<MainPage/>}/>
      <Route path="/expense/list" element={<ListPage/>}/>
      <Route path="/expense/stats" element={<StatsPage/>}/>
      <Route path="/expense/categories" element={<CreateCategoryPage />} />
      <Route path="/expense/categories/:categoryId" element={<CategoryEdit />} />
      <Route path="/expense/profile" element={<ProfilePage/>}/>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />}/>
    </Routes>
  )
}

export default App
