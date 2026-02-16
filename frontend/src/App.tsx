import { Routes, Route} from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import MainPage from "./components/main/MainPage"
import CreateCategoryPage from "./components/main/CreateCategoryPage"
import StatsPage from "./components/main/StatsPage"
import ListPage from "./components/main/ListPage"

import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/list" element={<ListPage/>}/>
      <Route path="/stats" element={<StatsPage/>}/>
      <Route path="/create-category" element={<CreateCategoryPage/>}/>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />}/>
    </Routes>
  )
}

export default App
