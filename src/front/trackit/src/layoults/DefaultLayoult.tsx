import '../../styles/index.css';
import { Outlet } from "react-router-dom";

export function AuthLayoult () {
    return (
        <div className="flex w-full min-h-screen">
            <Outlet />
        </div>
    )
}