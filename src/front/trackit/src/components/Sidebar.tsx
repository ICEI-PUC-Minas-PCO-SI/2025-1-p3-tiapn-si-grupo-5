import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SidebarVariant } from "./SidebarVariant";

{
  /*Variáveis que serão consumidos da API*/
}

const userPicture = null;
const userName = "usuário";
const userManagement = "gerência";
const userType = 3;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`flex-col gap-6 py-5.5 min-h-screen bg-slate-200 inline-flex justify-start items-start transition-all duration-400 relative ${collapsed ? "w-22" : "w-44 px-4"
        }`}
    >
      <button
        className="absolute left-full top-6 -translate-x-1/2 z-10 flex items-center justify-center rounded-full bg-sky-700 shadow-lg cursor-pointer"
        style={{ width: "1.2rem", height: "1.2rem" }}
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? "Expandir sidebar" : "Retrair sidebar"}
        type="button"
      >
        {collapsed ? (
          <FaChevronRight size="0.8rem" className="text-slate-100" />
        ) : (
          <FaChevronLeft size="0.8rem" className="text-slate-100" />
        )}
      </button>
      <div className="w-full flex items-center justify-center">
          <span className="text-center button-base text-2xl font-bold tracking-wide w-full">
            TrackIT
          </span>
      </div>
      <div className="w-full flex justify-center items-center transition-all duration-300">
        {collapsed ? (
          <span className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center">
            {userPicture ? (
              <img src={userPicture} />
            ) : (
              <FaUserCircle size={36} />
            )}
          </span>
        ) : (
          <div className="inline-flex self-stretch justify-evenly gap-2.5 w-full">
            <span className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center">
              {userPicture ? (
                <img src={userPicture} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </span>
            <div>
              <p className="menu-2">{userName}</p>
              <p className="menu-2">{userManagement}</p>
            </div>
          </div>
        )}
      </div>
      <SidebarVariant userType={userType} isCollapsed={collapsed} />
    </div>
  );
}
