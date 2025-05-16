import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { ForgotPassword } from "../pages/reset-password/ForgotPassword";
import { Test } from "../pages/Test";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
}
