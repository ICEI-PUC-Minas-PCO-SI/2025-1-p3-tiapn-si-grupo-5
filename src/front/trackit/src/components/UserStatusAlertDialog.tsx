import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { updateUserStatus } from "@/api/users";
import type { User } from "@/interfaces/InterfacesDataTableUsers";
import { useState } from "react";

interface UserStatusAlertDialogProps {
    user: User;
    newStatus: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    onError: () => void;
}

export function UserStatusAlertDialog({
    user,
    newStatus,
    open,
    onOpenChange,
    onSuccess,
    onError,
}: UserStatusAlertDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const res = await updateUserStatus(user.id, newStatus);
            if (res.ok) {
                onSuccess();
            } else {
                onError();
            }
        } catch {
            onError();
        } finally {
            setLoading(false);
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {newStatus === 0 ? "Desativar usuário" : "Ativar usuário"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja {newStatus === 0 ? "desativar" : "ativar"} o usuário <b>{user.name}</b>?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                        {newStatus === 0 ? "Desativar" : "Ativar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
