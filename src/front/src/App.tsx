import { StrictMode } from 'react'
import './styles/index.css'
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router.tsx";

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StrictMode>
  );
}