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
        console.log('getMe() response:', data);
        if (data && data.usuario) {
          const usuario = data.usuario;
          console.log('usuario extraído:', usuario);
          console.log('usuario.nomeGerencia:', usuario.nomeGerencia);
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
    setUserState(user);
    if (!user) {
      // Não é mais necessário remover token do cookie
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