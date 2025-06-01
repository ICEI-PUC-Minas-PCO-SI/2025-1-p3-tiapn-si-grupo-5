import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarSeparator,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
    Home,
    Settings,
    PlusCircle,
    Ticket,
    BarChart4,
    ClipboardList,
    Users,
    SlidersHorizontal,
    ChevronDown,
    AlertTriangle,
    Tags,
    Building,
    Clock
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserProfileSection } from "./UserProfileSection";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
export function Sidebar() {
    const location = useLocation();
    const [isParamsOpen, setIsParamsOpen] = useState(false);
    const { user, logout } = useUser();

    let userRole: "admin" | "analyst" | "user" | undefined;
    if (user) {
        if (user.tipo === 1) userRole = "admin";
        else if (user.tipo === 2) userRole = "analyst";
        else if (user.tipo === 3) userRole = "user";
    }
    const handleLogout = () => {
        logout();
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
                            isActive={location.pathname === "/home"}
                            variant="default"
                            size="default"
                        >
                            <Link to="./">
                                <Home className="mr-2" />
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {userRole === "user" && (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/user/open-ticket"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/user/open-ticket">
                                        <PlusCircle className="mr-2" />
                                        <span>Abrir Chamado</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/user/tickets"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/user/tickets">
                                        <Ticket className="mr-2" />
                                        <span>Ver Chamados</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/user/settings"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/user/settings">
                                        <Settings className="mr-2" />
                                        <span>Configurações</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>
                    )}

                    {userRole === "analyst" && (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/analyst/assign-tickets"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/analyst/assign-tickets">
                                        <ClipboardList className="mr-2" />
                                        <span>Atribuir Chamados</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/analyst/performance"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/analyst/performance">
                                        <BarChart4 className="mr-2" />
                                        <span>Desempenho</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/analyst/settings"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/analyst/settings">
                                        <Settings className="mr-2" />
                                        <span>Configurações</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>
                    )}

                    {userRole === "admin" && (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/admin/dashboard"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/admin/dashboard">
                                        <BarChart4 className="mr-2" />
                                        <span>Desempenho</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    aria-expanded={isParamsOpen}
                                    onClick={() => setIsParamsOpen(!isParamsOpen)}
                                    className="justify-between"
                                    variant="default"
                                    size="default"
                                >
                                    <div className="flex items-center">
                                        <SlidersHorizontal className="h-4 w-4 mr-4" />
                                        <span>Parâmetros</span>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isParamsOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </SidebarMenuButton>
                                {isParamsOpen && (
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={location.pathname === "/admin/params/priority"}
                                            >
                                                <Link to="/admin/params/priority">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    <span>Prioridade</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={location.pathname === "/admin/params/type"}
                                            >
                                                <Link to="/admin/params/type">
                                                    <Tags className="h-4 w-4" />
                                                    <span>Tipo</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={location.pathname === "/admin/params/status"}
                                            >
                                                <Link to="/admin/params/status">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Status</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={location.pathname === "/admin/params/department"}
                                            >
                                                <Link to="/admin/params/department">
                                                    <Building className="h-4 w-4" />
                                                    <span>Gerência</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/admin/users"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/admin/management-users">
                                        <Users className="mr-2" />
                                        <span>Usuários</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/admin/open-tickets"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/admin/open-tickets">
                                        <Ticket className="mr-2" />
                                        <span>Chamados em Aberto</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/admin/assigned-tickets"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/admin/assigned-tickets">
                                        <ClipboardList className="mr-2" />
                                        <span>Chamados Atribuídos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === "/admin/settings"}
                                    variant="default"
                                    size="default"
                                >
                                    <Link to="/admin/settings">
                                        <Settings className="mr-2" />
                                        <span>Configurações</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>
                    )}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                {user && (
                    <UserProfileSection
                        name={user.nome.split(" ").slice(0, 2).join(" ")}
                        email={user.email}
                        role={user.tipo === 1 ? "admin" : user.tipo === 2 ? "analyst" : "user"}
                        department={user.nomeGerencia || ""}
                        onLogout={handleLogout}
                        avatarUrl={user.fotoPerfil}
                    />
                )}
            </SidebarFooter>
        </UISidebar>
    );
}
