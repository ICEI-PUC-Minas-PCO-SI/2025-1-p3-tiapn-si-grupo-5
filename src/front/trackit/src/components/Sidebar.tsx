import { FaUserCircle } from "react-icons/fa";

{/*Variáveis que serão consumidos da API*/}
const userPicture = null;
const userName = "usuário";
const userManagement = "gerência";

export function Sidebar() {
  return (
    <div className="flex-col gap-6 w-44 min-h-screen py-4 px-8 bg-slate-200 inline-flex justify-start items-start">
      <div className="w-full">
        <h2 className="text-center button-base">TrackIT</h2>
      </div>
      <div className="inline-flex self-stretch justify-start  gap-2.5 w-full">
        <span className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center">
          {userPicture
            ? <img src={userPicture} />
            : <FaUserCircle size={36} />
          }
        </span>
        <div>
          <p className="menu-2">{userName}</p>
          <p className="menu-2">{userManagement}</p>
        </div>
      </div>
    </div>
  )

}