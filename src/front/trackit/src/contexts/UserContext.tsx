import { createContext, useContext, useState, useEffect } from "react";
import { DefaultSpinner } from "@/components/ui/spinner";
import { getMe, logoutApi } from "@/api/auth";
import type { IMeResponse } from "@/api/auth";

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
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
  logoutLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    async function fetchUserAndManagement() {
      try {
        const data: IMeResponse | null = await getMe();
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
          setUserState(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndManagement();
  }, []);

  function setUser(user: User | null) {
    if (user && user.nomeGerencia === undefined) {
      // Busca do backend para garantir nomeGerencia atualizado
      getMe().then((data) => {
        if (data && data.usuario) {
          setUserState({
            id: data.usuario.id,
            nome: data.usuario.nome,
            email: data.usuario.email,
            ramal: data.usuario.ramal,
            matricula: data.usuario.matricula,
            gerencia: data.usuario.gerencia ?? undefined,
            tipo: data.usuario.tipo ?? undefined,
            ativo: data.usuario.ativo,
            fotoPerfil: data.usuario.fotoPerfil ?? undefined,
            nomeGerencia: data.usuario.nomeGerencia ?? undefined,
            idTipoUsuario: data.usuario.idTipoUsuario ?? undefined,
          });
        } else {
          setUserState(user);
        }
      });
    } else {
      setUserState(user);
    }
  }

  async function logout() {
    setLogoutLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
    setUserState(null);
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