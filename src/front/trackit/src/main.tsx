import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { UserProvider } from "@/contexts/UserContext";
import { User } from 'lucide-react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </UserProvider>
)