import { StrictMode, useEffect } from 'react'
import './styles/index.css'
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router.tsx";
import { API_BASE_URL } from "./api/config.ts";

export function App() {
  useEffect(() => {
    console.log(`API Base URL: ${API_BASE_URL}`);
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StrictMode>
  );
}