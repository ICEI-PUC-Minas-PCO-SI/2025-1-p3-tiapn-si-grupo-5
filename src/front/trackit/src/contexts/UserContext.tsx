import { createContext, useContext, useState, useEffect } from "react";
import { DefaultSpinner } from "@/components/ui/spinner";
import { getMe } from "@/api/auth";
import { getAllActiveManagements } from "@/api/management";
import type { IManagement } from "../api/management";
import Cookies from "js-cookie";

type User = {
  id: number;
  nome: string;
  email: string;
  ramal?: string;
  matricula?: string;
  gerencia?: number;
  tipo?: number;
  ativo: number;
  createdAt?: string;
  nomeGerencia?: string;
  fotoPerfil?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null, token?: string) => void;
  logout: () => void;
  loading: boolean;
  logoutLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    async function fetchUserAndManagement() {
      if (token) {
        try {
          const data = await getMe(token);
          if (data && data.usuario) {
            const usuario = data.usuario;
            let nomeGerencia: string | undefined = undefined;
            if (usuario.gerencia) {
              try {
                const managements: IManagement[] = await getAllActiveManagements();
                const found = managements.find(
                  (g) => g.idGerencia === usuario.gerencia
                );
                nomeGerencia = found?.nomeGerencia;
              } catch {
                nomeGerencia = undefined;
              }
            }
            setUserState({ ...usuario, nomeGerencia, fotoPerfil: usuario.fotoPerfil });
          } else {
            logout();
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchUserAndManagement();
  }, []);

  function setUser(user: User | null, token?: string) {
    setUserState(user);
    if (token) {
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 60 minutos
      Cookies.set("token", token, { expires });
    }
    if (!user) {
      Cookies.remove("token");
    }
  }

  async function logout() {
    setLogoutLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUserState(null);
    Cookies.remove("token");
    setLogoutLoading(false);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, logoutLoading }}>
      {(loading || logoutLoading) ? <DefaultSpinner /> : children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser precisa ser utilizado com UserProvider");
  return context;
}