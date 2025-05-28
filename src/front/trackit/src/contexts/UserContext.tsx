import { createContext, useContext, useState, useEffect } from "react";

type User = {
    id: number;
    nome: string;
    email: string;
    ramal?: string;
    gerencia?: number;
    tipo?: number;
    ativo: number;
    createdAt?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null, token?: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  // Busca usuário autenticado ao iniciar, se houver token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.usuario) setUserState(data.usuario);
          else logout();
        });
    }
  }, []);

  // Salva token no localStorage, mas não salva o user inteiro
  function setUser(user: User | null, token?: string) {
    setUserState(user);
    if (token) {
      localStorage.setItem("token", token);
    }
    if (!user) {
      localStorage.removeItem("token");
    }
  }

  function logout() {
    setUserState(null);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser precisa ser utilizado com UserProvider");
  return context;
}