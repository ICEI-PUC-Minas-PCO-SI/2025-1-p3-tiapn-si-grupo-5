import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App.tsx'

import { RouterProvider, createBrowserRouter } from "react-router"

import { Register } from './pages/registerLogin/Register.tsx'
import { Login } from './pages/registerLogin/Login.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
