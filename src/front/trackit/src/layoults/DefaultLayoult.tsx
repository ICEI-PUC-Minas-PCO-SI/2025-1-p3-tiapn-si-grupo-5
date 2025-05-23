import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function DefaultLayoult() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1 px-16 py-20 w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
