import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { ForgotPassword } from "../pages/reset-password/ForgotPassword";
import { ResetPassword } from "@/pages/reset-password/ResetPassword";
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
import { AnalystAssignTickets } from "@/pages/analyst-assign-tickets/AnalystAssignTickets";
import { AnalystTickets } from "@/pages/analyst-tickets/AnalystTickets";
import { UserTickets } from "@/pages/user-tickets/UserTickets";
import { Dashboard } from "@/pages/admin-dashbord/Dashboard";
import { AdminAssignTickets } from "@/pages/admin-assign-tickets/AdminAssignTickets";
import { AdminTeamTickets } from "@/pages/admin-team-tickets/AdminTeamTickets";
import { AnalystDashboard } from "@/pages/analyst-dashboard/AnalystDashboard";
import { ChatPage } from "@/pages/chat/ChatPage";
import { Presentation } from "@/pages/presentation/Presentation";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user" element={
                <PrivateRoute allowedTypes={[3]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="open-ticket" element={<OpenTicket />} />
                <Route path="my-tickets" element={<UserTickets />} />
                <Route path="settings" element={< Settings />} />
                <Route path="chat" element={<ChatPage />} />
            </Route>
            <Route path="/analyst" element={
                <PrivateRoute allowedTypes={[2]}>
                    <DefaultLayoult />
                </PrivateRoute>
            }>
                <Route index element={<Index />} />
                <Route path="settings" element={< Settings />} />
                <Route path="assign-tickets" element={<AnalystAssignTickets />} />
                <Route path="my-tickets" element={<AnalystTickets />} />
                <Route path="dashboard" element={<AnalystDashboard />} />
                <Route path="chat" element={<ChatPage />} />
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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="open-tickets" element={<AdminAssignTickets />} />
                <Route path="assigned-tickets" element={<AdminTeamTickets />} />
                <Route path="chat" element={<ChatPage />} />
            </Route>
        </Routes>
    );
}
