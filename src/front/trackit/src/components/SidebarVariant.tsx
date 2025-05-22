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
  FolderOpenIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface SidebarVariantProps {
  userType: number;
  isCollapsed: boolean;
}

export function SidebarVariant({ userType, isCollapsed }: SidebarVariantProps) {
  const navClass = `flex items-center ${
    isCollapsed ? "justify-center" : "justify-between"
  }`;

  if (userType === 1) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <Link to="open-ticket" className="block">
          <nav className={navClass}>
            <PlusCircleIcon size={30} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">abrir chamado</span>
            )}
          </nav>
        </Link>
        <Link to="see-tickets" className="block">
          <nav className={navClass}>
            <ClockCountdownIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">ver chamados</span>
            )}
          </nav>
        </Link>
        <Link to="settings" className="block">
          <nav className={navClass}>
            <GearIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">configurações</span>
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
              <span className="menu-1 slate-800 ml-2">pegar chamado</span>
            )}
          </nav>
        </Link>
        <Link to="see-tickets" className="block">
          <nav className={navClass}>
            <ClockCountdownIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">ver chamados</span>
            )}
          </nav>
        </Link>
        <Link to="settings" className="block">
          <nav className={navClass}>
            <ChartBarIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">desempenho</span>
            )}
          </nav>
        </Link>
        <Link to="settings" className="block">
          <nav className={navClass}>
            <GearIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">configurações</span>
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
              <span className="menu-1 slate-800 ml-2">Dashbord</span>
            )}
          </nav>
        </Link>
        <Link to="params/priority" className="block">
          <nav className={navClass}>
            <FadersIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Prioridades</span>
            )}
          </nav>
        </Link>
        <Link to="params/status" className="block">
          <nav className={navClass}>
            <CheckCircleIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Status</span>
            )}
          </nav>
        </Link>
        <Link to="params/type" className="block">
          <nav className={navClass}>
            <CheckerboardIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Tipo</span>
            )}
          </nav>
        </Link>
        <Link to="params/managment" className="block">
          <nav className={navClass}>
            <BuildingOfficeIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Gerências</span>
            )}
          </nav>
        </Link>
        <Link to="params/users" className="block">
          <nav className={navClass}>
            <UserCircleGearIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Usuários</span>
            )}
          </nav>
        </Link>
        <Link to="tickets/opened" className="block">
          <nav className={navClass}>
            <FolderOpenIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Em Aberto</span>
            )}
          </nav>
        </Link>
        <Link to="tickets/opened" className="block">
          <nav className={navClass}>
            <HandPointingIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Atribuídos</span>
            )}
          </nav>
        </Link>
        <Link to="settings" className="block">
          <nav className={navClass}>
            <GearIcon size={32} />
            {!isCollapsed && (
              <span className="menu-1 slate-800 ml-2">Configurações</span>
            )}
          </nav>
        </Link>
      </div>
    );
  }
}
