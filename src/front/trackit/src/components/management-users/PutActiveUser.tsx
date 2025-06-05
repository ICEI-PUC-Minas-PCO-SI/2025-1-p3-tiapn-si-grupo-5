import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/api/users";
import type { User } from "@/interfaces/InterfacesDataTableUsers";
import { useState } from "react";

interface PutActiveUserProps {
    user: User;
    newStatus: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    onError: () => void;
}

export function PutActiveUser({
    user,
    newStatus,
    open,
    onOpenChange,
    onSuccess,
    onError,
}: PutActiveUserProps) {
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

    const actionVariant = newStatus === 0 ? "delete" : "active";

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {newStatus === 0 ? "Desativar usuário" : "Ativar usuário"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja {newStatus === 0 ? "desativar" : "ativar"} o
                        usuário <b>{user.name}</b>?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
                    <Button
                        variant={actionVariant}
                        onClick={handleConfirm}
                        disabled={loading}
                        type="button"
                    >
                        {newStatus === 0 ? "Desativar" : "Ativar"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}