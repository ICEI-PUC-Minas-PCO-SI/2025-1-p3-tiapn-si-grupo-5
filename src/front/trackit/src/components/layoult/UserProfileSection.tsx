import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Building } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

type UserProfileSectionProps = {
    onLogout?: () => void;
};

export function UserProfileSection({
    onLogout = () => { },
}: UserProfileSectionProps) {
    const roleLabels: Record<number, string> = {
        1: "Gestor",
        2: "Analista",
        3: "Usuário",
    };

    const { user } = useUser();

    const avatarUrl = user?.fotoPerfil;
    const displayName = user?.nome || "Não encontrado";
    const displayEmail = user?.email || "Não encontrado";
    const displayRole = user?.tipo ? roleLabels[user.tipo] || "Não encontrado" : "Não encontrado";
    const managementName = user?.nomeGerencia || "Não informado";

    function getInitials(name: string): string {
        return name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-sidebar-accent transition-colors">
                    <Avatar className="h-8 w-8">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={displayName} />
                        ) : (
                            <AvatarFallback>
                                {getInitials(displayName)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate" title={displayName}>
                            {displayName.length > 20 ? `${displayName.slice(0, 20)}...` : displayName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate" title={displayEmail}>
                            {displayEmail.length > 30 ? `${displayEmail.slice(0, 25)}...` : displayEmail}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={5} className="w-64">
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={displayName} />
                        ) : (
                            <AvatarFallback>
                                {getInitials(displayName)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="font-medium truncate" title={displayName}>
                            {displayName.length > 20 ? `${displayName.slice(0, 20)}...` : displayName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate" title={displayEmail}>
                            {displayEmail.length > 30 ? `${displayEmail.slice(0, 28)}...` : displayEmail}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <User className="h-4 w-4 mr-2" />
                    <span>Acesso: {displayRole}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Gerência: {managementName}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                    onClick={() => onLogout()}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
