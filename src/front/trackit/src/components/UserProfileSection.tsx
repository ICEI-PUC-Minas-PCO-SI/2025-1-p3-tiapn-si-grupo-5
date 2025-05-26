import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Building } from "lucide-react";

type UserProfileSectionProps = {
    name: string;
    email: string;
    role: "admin" | "analyst" | "user";
    department?: string; // Adicionado campo para gerência
    avatarUrl?: string;
    onLogout?: () => void;
};

export function UserProfileSection({
    name = "Usuário TrackIt",
    email = "usuario@trackit.com",
    role = "user",
    department = "Tecnologia da Informação", // Valor padrão para gerência
    avatarUrl,
    onLogout = () => console.log("Logout clicked"),
}: UserProfileSectionProps) {
    const roleLabels = {
        admin: "Administrador",
        analyst: "Analista",
        user: "Usuário",
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-sidebar-accent transition-colors">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>
                            {name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{name}</p>
                        <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={5} className="w-64">
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>
                            {name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <User className="h-4 w-4 mr-2" />
                    <span>Função: {roleLabels[role]}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Gerência: {department}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                    onClick={onLogout}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
