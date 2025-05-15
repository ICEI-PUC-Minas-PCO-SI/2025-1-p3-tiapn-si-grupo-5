import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider, createBrowserRouter } from "react-router"
import { Register } from './pages/registerLogin/Register.tsx'
import { Login } from './pages/registerLogin/Login.tsx'
import { ForgotPassword } from './pages/registerLogin/ForgotPassword.tsx'
import { ResetPassword } from './pages/ResetPassword.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "noPassword",
    element: <ForgotPassword />
  },
  {
    path: "resetPassword",
    element: <ResetPassword />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
