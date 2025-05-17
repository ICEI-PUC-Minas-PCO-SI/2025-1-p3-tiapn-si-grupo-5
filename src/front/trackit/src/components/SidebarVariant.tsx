import {
    HandPointingIcon,
    PlusCircleIcon,
    ClockCountdownIcon,
    GearIcon,
    ChartBarIcon,
    FadersIcon,
    CheckCircleIcon,
    CheckerboardIcon,
    BuildingOfficeIcon,
    UserCircleGearIcon,
    FolderOpenIcon
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface SidebarVariantProps {
    userType: number;
    isCollapsed: boolean;
}

export function SidebarVariant({ userType, isCollapsed }: SidebarVariantProps) {
    const navClass = `flex items-center ${isCollapsed ? "justify-center" : "justify-between"
        }`;

    if (userType === 1) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <Link to="open-ticket" className="block">
                    <nav className={navClass}>
                        <PlusCircleIcon size={30} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">abrir chamado</span>
                        )}
                    </nav>
                </Link>
                <Link to="see-tickets" className="block">
                    <nav className={navClass}>
                        <ClockCountdownIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">ver chamados</span>
                        )}
                    </nav>
                </Link>
                <Link to="settings" className="block">
                    <nav className={navClass}>
                        <GearIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">configurações</span>
                        )}
                    </nav>
                </Link>
            </div>
        );
    }
    if (userType === 2) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <Link to="choose-ticket" className="block">
                    <nav className={navClass}>
                        <HandPointingIcon size={30} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">pegar chamado</span>
                        )}
                    </nav>
                </Link>
                <Link to="see-tickets" className="block">
                    <nav className={navClass}>
                        <ClockCountdownIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">ver chamados</span>
                        )}
                    </nav>
                </Link>
                <Link to="settings" className="block">
                    <nav className={navClass}>
                        <ChartBarIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">desempenho</span>
                        )}
                    </nav>
                </Link>
                <Link to="settings" className="block">
                    <nav className={navClass}>
                        <GearIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">configurações</span>
                        )}
                    </nav>
                </Link>
            </div>
        );
    }
    if (userType === 3) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <Link to="dashbord" className="block">
                    <nav className={navClass}>
                        <ChartBarIcon size={30} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">dashbord</span>
                        )}
                    </nav>
                </Link>
                <Link to="params/priority" className="block">
                    <nav className={navClass}>
                        <FadersIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">prioridades</span>
                        )}
                    </nav>
                </Link>
                <Link to="params/status" className="block">
                    <nav className={navClass}>
                        <CheckCircleIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">status</span>
                        )}
                    </nav>
                </Link>
                <Link to="params/type" className="block">
                    <nav className={navClass}>
                        <CheckerboardIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">tipo</span>
                        )}
                    </nav>
                </Link>
                <Link to="params/managment" className="block">
                    <nav className={navClass}>
                        <BuildingOfficeIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">gerências</span>
                        )}
                    </nav>
                </Link>
                <Link to="params/users" className="block">
                    <nav className={navClass}>
                        <UserCircleGearIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">usuários</span>
                        )}
                    </nav>
                </Link>
                <Link to="tickets/opened" className="block">
                    <nav className={navClass}>
                        <FolderOpenIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">em aberto</span>
                        )}
                    </nav>
                </Link>
                <Link to="tickets/opened" className="block">
                    <nav className={navClass}>
                        <HandPointingIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">atribuídos</span>
                        )}
                    </nav>
                </Link>
                <Link to="settings" className="block">
                    <nav className={navClass}>
                        <GearIcon size={32} />
                        {!isCollapsed && (
                            <span className="menu-1 slate-800">configurações</span>
                        )}
                    </nav>
                </Link>
            </div>
        );
    }
}
