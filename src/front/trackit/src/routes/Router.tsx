import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { ForgotPassword } from "../pages/reset-password/ForgotPassword";
import { DefaultLayoult } from "../layouts/DefaultLayoult";
import { ManagementUsers } from "../pages/management-users/ManagementUsers";
import { Index } from "@/layouts/Index";
import { OpenTicket } from "@/pages/open-ticket/openTicket";
import { PrivateRoute } from "./PrivateRoute";
import { Settings } from "@/pages/settings/Settings";
import { DetailsStatus } from "@/pages/params/Status";
import { DetailsManagement } from "@/pages/params/Management";
import { TicketType } from "@/pages/params/TicketType";
import { Priority } from "@/pages/params/Priority";
import { AssignTickets } from "@/pages/assign-tickets/AssignTickets";
import { AnalystTickets } from "@/pages/analyst-tickets/AnalystTickets";
import { UserTickets } from "@/pages/user-tickets/UserTickets";

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
                <Route path="my-tickets" element={<UserTickets />} />
                <Route path="settings" element={< Settings />} />
            </Route>
            <Route path="/analyst" element={
                <PrivateRoute allowedTypes={[2]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="settings" element={< Settings />} />
                <Route path="assign-tickets" element={<AssignTickets />} />
                <Route path="my-tickets" element={<AnalystTickets />} />
            </Route>
            <Route path="/admin" element={
                <PrivateRoute allowedTypes={[1]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="management-users" element={<ManagementUsers />} />
                <Route path="settings" element={<Settings />} />
                <Route path="params/status" element={<DetailsStatus />} />
                <Route path="params/department" element={<DetailsManagement />} />
                <Route path="params/type" element={<TicketType />} />
                <Route path="params/priority" element={<Priority />} />
            </Route>
        </Routes>
    );
}
