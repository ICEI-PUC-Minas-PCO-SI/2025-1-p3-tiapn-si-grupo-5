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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
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
        user.name.toLowerCase().includes(lowerCaseQuery)
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

  const handleSuccess = () => {
    fetchUsers();
    setAlert({ type: "success", message: "Usuário atualizado com sucesso!" });
    closeEditModal();
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
    <div className="space-y-4">
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert
            variant={alert.type === "success" ? "success" : "destructive"}
            className="flex items-center justify-between space-x-4"
          >
            <div>
              <AlertTitle>{alert.type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </div>
            <button
              onClick={() => setAlert(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fechar alerta"
            >
              <X className="w-4 h-4" />
            </button>
          </Alert>
        </div>
      )}
      <h1 className="title-h1">Gerenciar Usuários</h1>
      <div className="flex justify-between">
        <Searchbar onSearch={handleSearch} />
        <div className="flex gap-3">
          <CrudUserForm onSuccess={fetchUsers} />
          <DropdownMenu open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4 mr-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[260px]">
              {/* Filtro por tipo de acesso */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Tipo de Acesso</div>
              <Select value={accessTypeFilter} onValueChange={handleAccessTypeChange}>
                <SelectTrigger className="w-full mb-2">
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
              {/* Filtro por gerência */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Gerência</div>
              <Select value={managementFilter} onValueChange={handleManagementChange}>
                <SelectTrigger className="w-full mb-2">
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
              {/* Filtro por ativo */}
              <div className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-white">Ativo</div>
              <Select value={ativoFilter} onValueChange={handleAtivoChange}>
                <SelectTrigger className="w-full mb-2">
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
              {/* Botão para limpar filtros */}
              <div className="flex justify-center px-2 pb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex items-center gap-1"
                  disabled={!isAnyFilterSelected}
                >
                  <XCircle className="w-4 h-4" />
                  Limpar filtros
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
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
            }}
          />
        )}
      </div>
      <Dialog open={editModalState.isOpen} onOpenChange={(isOpen) => !isOpen && closeEditModal()}>
        {editModalState.user && (
          <PutUserForm
            user={editModalState.user}
            onSuccess={handleSuccess}
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
            fetchUsers();
            setAlert({
              type: "success",
              message: `Usuário ${statusDialog.newStatus === 0 ? "desativado" : "ativado"} com sucesso!`,
            });
          }}
          onError={() => {
            setAlert({
              type: "error",
              message: `Erro ao ${statusDialog.newStatus === 0 ? "desativar" : "ativar"} usuário.`,
            });
          }}
        />
      )}
    </div>
  );
}
