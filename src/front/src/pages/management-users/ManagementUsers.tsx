import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTableUsers } from "@/components/management-users/DataTableUsers";
import { Searchbar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { CrudUserForm } from "@/components/management-users/CrudUserForm";
import { PutUserForm } from "@/components/management-users/PutUserForm";
import { Dialog } from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import type { User, ActionButton } from "@/interfaces/InterfacesDataTableUsers";
import type { IUpdateUser } from "@/api/users";
import { getAllUsers } from "@/api/users";
import { PutActiveUser } from "@/components/management-users/PutActiveUser";
import { useUser } from "@/contexts/UserContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { TableSpinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GlobalAlert } from "@/components/ui/GlobalAlert";

export function ManagementUsers() {
  const [Data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    user: IUpdateUser | null;
  }>({ isOpen: false, user: null });
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [statusDialog, setStatusDialog] = useState<{
    open: boolean;
    user: User | null;
    newStatus: number;
  }>({ open: false, user: null, newStatus: 0 });
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Spinner state
  const [loading, setLoading] = useState(true);

  // Query params
  const [searchParams, setSearchParams] = useSearchParams();

  // Filtros controlados por query params
  const search = searchParams.get("search") || "";
  const accessTypeFilter = searchParams.get("accessType") || "__all__";
  const managementFilter = searchParams.get("management") || "__all__";
  const ativoFilter = searchParams.get("ativo") || "__all__";

  const { user: loggedInUser } = useUser();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers();
      const mappedUsers: User[] = users.map((u) => {
        return {
          id: u.id,
          name: u.name,
          accessType: u.accessType,
          management: u.management,
          ativo: u.ativo,
          nomeUsuario: u.name,
          email: "",
          ramal: "",
          matricula: u.matricula,
          fotoPerfil: u.fotoPerfil,
        };
      });
      setData(mappedUsers);
    } catch (error) {
      console.error("Erro ao processar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtros
  useEffect(() => {
    let data = [...Data];
    if (accessTypeFilter && accessTypeFilter !== "__all__") {
      data = data.filter((user) => user.accessType === accessTypeFilter);
    }
    if (managementFilter && managementFilter !== "__all__") {
      data = data.filter((user) => String(user.management.idGerencia) === managementFilter);
    }
    if (ativoFilter && ativoFilter !== "__all__") {
      data = data.filter((user) => String(user.ativo) === ativoFilter);
    }
    if (search) {
      const lowerCaseQuery = search.toLowerCase();
      data = data.filter((user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        (user.matricula && user.matricula.toLowerCase().includes(lowerCaseQuery))
      );
    }
    setFilteredData(data);
  }, [Data, accessTypeFilter, managementFilter, ativoFilter, search]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const mapUserToUpdateUser = (user: User & { matricula?: string }): IUpdateUser => {
    return {
      idUsuario: Number(user.id),
      matricula: user.matricula || "",
      gerencia: user.management.idGerencia,
      tipoUsuario:
        user.accessType === "Gestor"
          ? 1
          : user.accessType === "Analista"
            ? 2
            : 3,
      nomeUsuario: user.nomeUsuario,
      email: user.email,
      ramal: user.ramal,
    };
  };

  const openEditModal = (user: User) => {
    setEditModalState({
      isOpen: true,
      user: mapUserToUpdateUser(user as User & { matricula?: string }),
    });
  };

  const closeEditModal = () => {
    setEditModalState({ isOpen: false, user: null });
  };

  // Função para atualizar usuário na tabela, mantendo os campos extras
  const handleUpdateUser = (updatedUser: IUpdateUser) => {
    setData(prev =>
      prev.map(u => {
        if (u.id === String(updatedUser.idUsuario)) {
          return {
            ...u,
            accessType:
              updatedUser.tipoUsuario === 1
                ? "Gestor"
                : updatedUser.tipoUsuario === 2
                  ? "Analista"
                  : "Usuário",
            management: {
              ...u.management,
              idGerencia: updatedUser.gerencia,
            },
            nomeUsuario: updatedUser.nomeUsuario,
            email: updatedUser.email,
            ramal: updatedUser.ramal,
            matricula: updatedUser.matricula,
          } as User;
        }
        return u;
      })
    );
    setAlert({ type: "success", message: "Usuário atualizado com sucesso!" });
    closeEditModal();
  };

  const handleAddUser = (newUser: User) => {
    setData(prev => [...prev, newUser]);
    setAlert({ type: "success", message: "Usuário criado com sucesso!" });
    setCreateModalOpen(false);
  };

  const handleUpdateUserStatus = (userId: string | number, newStatus: number) => {
    setData(prev =>
      prev.map(u => u.id === userId ? { ...u, ativo: newStatus } : u)
    );
    setAlert({
      type: "success",
      message: `Usuário ${newStatus === 0 ? "desativado" : "ativado"} com sucesso!`,
    });
  };

  const handleError = () => {
    setAlert({ type: "error", message: "Erro ao atualizar usuário. Verifique os dados e tente novamente." });
  };

  const actions: ActionButton[] = [
    {
      label: "Editar",
      onClick: (row) => openEditModal(row),
      variant: "outline",
    },
    {
      label: (row: User) => row.ativo === 1 ? "Desativar" : "Ativar",
      onClick: (row) => {
        if (row.id === String(loggedInUser?.id)) {
          setAlert({
            type: "error",
            message: "Você não pode desativar seu próprio usuário enquanto estiver logado.",
          });
          return;
        }
        setStatusDialog({
          open: true,
          user: row,
          newStatus: row.ativo === 1 ? 0 : 1,
        });
      },
      variant: (row: User) => row.ativo === 1 ? "delete" : "active",
    },
  ];

  // Filtros para selects
  const accessTypes = Array.from(new Set(Data.map(u => u.accessType))).filter(Boolean);
  const managements = Array.from(
    new Map(Data.map(u => [u.management.idGerencia, u.management.nomeGerencia])).entries()
  ).map(([idGerencia, nomeGerencia]) => ({ idGerencia, nomeGerencia }));

  // Função para limpar todos os filtros e fechar o modal
  const clearFilters = () => {
    setSearchParams(params => {
      params.delete("accessType");
      params.delete("management");
      params.delete("ativo");
      params.delete("search");
      return params;
    });
    setFilterMenuOpen(false);
  };

  const isAnyFilterSelected =
    accessTypeFilter !== "__all__" ||
    managementFilter !== "__all__" ||
    ativoFilter !== "__all__" ||
    !!search;

  // Handlers para filtros
  const handleAccessTypeChange = (value: string) => {
    setSearchParams(params => {
      if (value === "__all__") {
        params.delete("accessType");
      } else {
        params.set("accessType", value);
      }
      return params;
    });
  };

  const handleManagementChange = (value: string) => {
    setSearchParams(params => {
      if (value === "__all__") {
        params.delete("management");
      } else {
        params.set("management", value);
      }
      return params;
    });
  };

  const handleAtivoChange = (value: string) => {
    setSearchParams(params => {
      if (value === "__all__") {
        params.delete("ativo");
      } else {
        params.set("ativo", value);
      }
      return params;
    });
  };

  const handleSearch = (query: string) => {
    setSearchParams(params => {
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden px-2 md:px-0">
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <GlobalAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
      <h1 className="title-h1">Gerenciar Usuários</h1>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="flex-1 w-full sm:w-auto">
          <Searchbar onSearch={handleSearch} placeholder="Pesquise pelo nome ou matrícula" />
        </div>
        <div className="flex gap-3 justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" onClick={() => setCreateModalOpen(true)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Criar usuário
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Filtrar
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end" className="min-w-[220px]">
              {/* Filtro por tipo de acesso */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Tipo de Acesso</div>
              <div className="px-2 mb-2">
                <Select value={accessTypeFilter} onValueChange={handleAccessTypeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="__all__">Todos</SelectItem>
                      {accessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Filtro por gerência */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Gerência</div>
              <div className="px-2 mb-2">
                <Select value={managementFilter} onValueChange={handleManagementChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="__all__">Todas</SelectItem>
                      {managements.map(m => (
                        <SelectItem key={m.idGerencia} value={String(m.idGerencia)}>{m.nomeGerencia}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Filtro por ativo */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Ativo</div>
              <div className="px-2 mb-2">
                <Select value={ativoFilter} onValueChange={handleAtivoChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="__all__">Todos</SelectItem>
                      <SelectItem value="1">Sim</SelectItem>
                      <SelectItem value="0">Não</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Botão para limpar filtros */}
              <div className="flex justify-center px-2 pb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex items-center gap-1 dark:text-white"
                  disabled={!isAnyFilterSelected}
                >
                  <XCircle className="w-4 h-4 dark:text-white" />
                  <span className="dark:text-white">Limpar filtros</span>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full max-w-full overflow-hidden">
        {loading ? (
          <TableSpinner />
        ) : (
          <DataTableUsers
            data={filteredData}
            actions={actions}
            visibleColumns={{
              id: true,
              name: true,
              accessType: true,
              management: true,
              ativo: true,
              nomeUsuario: true,
              email: true,
              ramal: true,
              matricula: false,
              fotoPerfil: true,
            }}
          />
        )}
      </div>
      <Dialog open={editModalState.isOpen} onOpenChange={(isOpen) => !isOpen && closeEditModal()}>
        {editModalState.user && (
          <PutUserForm
            user={
              (() => {
                const current = Data.find(u => String(u.id) === String(editModalState.user?.idUsuario));
                if (!current) return editModalState.user;
                return {
                  ...editModalState.user,
                  gerencia: current.management.idGerencia,
                  tipoUsuario:
                    current.accessType === "Gestor"
                      ? 1
                      : current.accessType === "Analista"
                        ? 2
                        : 3,
                  nomeUsuario: current.nomeUsuario,
                  email: current.email,
                  ramal: current.ramal,
                  matricula: current.matricula,
                };
              })()
            }
            onSuccess={handleUpdateUser}
            onError={handleError}
            onClose={closeEditModal}
          />
        )}
      </Dialog>
      {statusDialog.user && (
        <PutActiveUser
          user={statusDialog.user}
          newStatus={statusDialog.newStatus}
          open={statusDialog.open}
          onOpenChange={(open) => setStatusDialog((prev) => ({ ...prev, open }))}
          onSuccess={() => {
            handleUpdateUserStatus(statusDialog.user!.id, statusDialog.newStatus);
          }}
          onError={() => {
            setAlert({
              type: "error",
              message: `Erro ao ${statusDialog.newStatus === 0 ? "desativar" : "ativar"} usuário.`,
            });
          }}
        />
      )}
      <CrudUserForm
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleAddUser}
      />
    </div>
  );
}