import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserProfileSection } from "./UserProfileSection";

export function Sidebar() {
    const location = useLocation();

    const handleLogout = () => {
        // Implementar lógica de logout aqui
        console.log("Logout clicked");
    };

    return (
        <UISidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                    <span className="font-bold text-lg">TrackIt</span>
                </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={location.pathname === "/user/home"}
                            variant="default"
                            size="default"
                        >
                            <Link to="/user/home">
                                <Home className="mr-2" />
                                <span>Início</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={location.pathname.startsWith("/admin/management-users")}
                            variant="default"
                            size="default"
                        >
                            <Link to="/admin/management-users">
                                <Users className="mr-2" />
                                <span>Usuários</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <div className="px-2 py-2">
                    <UserProfileSection
                        name="Usuário Demo"
                        email="usuario@trackit.com"
                        role="admin"
                        department="ASTIN"
                        onLogout={handleLogout}
                    />
                </div>
            </SidebarFooter>
        </UISidebar>
    );
}
