import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { ForgotPassword } from "../pages/reset-password/ForgotPassword";
import { DefaultLayoult } from "../layoults/DefaultLayoult";
import { ManagementUsers } from "../pages/management-users/ManagementUsers";
import { Index } from "@/layoults/Index";
import { OpenTicket } from "@/pages/openTicket";
import { PrivateRoute } from "./PrivateRoute";
import { Settings } from "@/pages/settings/Settings";
import { DetailsStatus } from "@/pages/params/Status";
import { DetailsManagement } from "@/pages/params/Management";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user" element={
                <PrivateRoute allowedTypes={[3]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="open-ticket" element={<OpenTicket />} />
                <Route path="settings" element={< Settings />} />
            </Route>
            <Route path="/analyst" element={
                <PrivateRoute allowedTypes={[2]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="settings" element={< Settings />} />
            </Route>
            <Route path="/admin" element={
                <PrivateRoute allowedTypes={[1]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="management-users" element={<ManagementUsers />} />
                <Route path="settings" element={< Settings />} />
                <Route path="params/status" element={<DetailsStatus />} />
                <Route path="params/department" element={<DetailsManagement />} />
            </Route>
        </Routes>
    );
}
