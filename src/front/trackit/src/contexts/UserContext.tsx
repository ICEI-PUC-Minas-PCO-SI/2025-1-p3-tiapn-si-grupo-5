import { createContext, useContext, useState, useEffect } from "react";
import { DefaultSpinner } from "@/components/ui/spinner";
import { getMe } from "@/api/auth";
import type { IMeResponse } from "@/api/auth";
import Cookies from "js-cookie";

export interface User {
  id: number;
  nome: string;
  email: string;
  ramal?: string;
  matricula?: string;
  gerencia?: number | null;
  tipo?: number | null;
  ativo: number;
  createdAt?: string;
  nomeGerencia?: string;
  fotoPerfil?: string | null;
  idTipoUsuario?: number | null;
}

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
          const data: IMeResponse | null = await getMe(token);
          if (data && data.usuario) {
            const usuario = data.usuario;
            setUserState({
              id: usuario.id,
              nome: usuario.nome,
              email: usuario.email,
              ramal: usuario.ramal,
              matricula: usuario.matricula,
              gerencia: usuario.gerencia ?? undefined,
              tipo: usuario.tipo ?? undefined,
              ativo: usuario.ativo,
              fotoPerfil: usuario.fotoPerfil ?? undefined,
              nomeGerencia: usuario.nomeGerencia ?? undefined,
              idTipoUsuario: usuario.idTipoUsuario ?? undefined,
            });
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
      (async () => {
        const data: IMeResponse | null = await getMe(token);
        if (data && data.usuario) {
          const usuario = data.usuario;
          setUserState({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            ramal: usuario.ramal,
            matricula: usuario.matricula,
            gerencia: usuario.gerencia ?? undefined,
            tipo: usuario.tipo ?? undefined,
            ativo: usuario.ativo,
            fotoPerfil: usuario.fotoPerfil ?? undefined,
            nomeGerencia: usuario.nomeGerencia ?? undefined,
            idTipoUsuario: usuario.idTipoUsuario ?? undefined,
          });
        }
      })();
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