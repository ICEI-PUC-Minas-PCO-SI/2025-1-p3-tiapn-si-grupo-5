import ReactDOM from 'react-dom/client'
import { App } from './App'
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/components/theme/theme-provider"

export default App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ThemeProvider storageKey="tackit-theme" defaultTheme="light">
      <App />
    </ThemeProvider>
  </UserProvider>
)

console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);