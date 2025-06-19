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
    onLogout?: () => void;
    name: string;
    email: string;
    role: string;
    department: string;
    avatarUrl?: string;
    previewProfilePhoto?: string | null;
};

export function UserProfileSection({
    onLogout = () => { },
    name,
    email,
    role,
    department,
    avatarUrl,
    previewProfilePhoto, // <-- adicione aqui
}: UserProfileSectionProps) {
    function getInitials(name: string): string {
        return name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    // Exibe o papel do usuário em português
    const roleLabel =
        role === "admin"
            ? "Gestor"
            : role === "analyst"
                ? "Analista"
                : "Usuário";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-sidebar-accent transition-colors">
                    <Avatar className="h-8 w-8">
                        {previewProfilePhoto ? (
                            <AvatarImage src={previewProfilePhoto} alt={name} />
                        ) : avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={name} />
                        ) : (
                            <AvatarFallback>
                                {getInitials(name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate" title={name}>
                            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate" title={email}>
                            {email.length > 30 ? `${email.slice(0, 25)}...` : email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={5} className="w-64">
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                        {previewProfilePhoto ? (
                            <AvatarImage src={previewProfilePhoto} alt={name} />
                        ) : avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={name} />
                        ) : (
                            <AvatarFallback>
                                {getInitials(name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="font-medium truncate" title={name}>
                            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate" title={email}>
                            {email.length > 30 ? `${email.slice(0, 28)}...` : email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <User className="h-4 w-4 mr-2" />
                    <span>Acesso: {roleLabel}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Gerência: {department}</span>
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
