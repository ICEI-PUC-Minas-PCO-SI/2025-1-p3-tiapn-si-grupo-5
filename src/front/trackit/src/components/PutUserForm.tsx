import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { getAllActiveManagements } from "@/api/Management";
import { getAllUserTypes } from "@/api/UserTypes";
import { updateUser } from "@/api/Users";
import type { UpdateUser } from "@/interfaces/InterfaceUpdateUser";
import { useUser } from "@/contexts/UserContext";

const putUserSchema = z.object({
    matricula: z
        .string()
        .min(4, "A matrícula deve ter pelo menos 4 dígitos")
        .regex(/^[0-9]{1,14}[0-9Xx]{1}$/, {
            message: "Matrícula inválida. Digite os números e o dígito verificador (ex: 123456X)",
        }),
    gerencia: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Selecione uma gerência válida",
    }),
    tipoUsuario: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Selecione um tipo de acesso válido",
    }),
});

type PutUserSchema = z.infer<typeof putUserSchema>;

export function PutUserForm({
    user,
    onSuccess,
    onError,
    onClose,
}: {
    user: UpdateUser;
    onSuccess: () => void;
    onError: () => void;
    onClose: () => void;
}) {
    const { user: loggedInUser, logout } = useUser();
    const [isModalOpen] = useState(true);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [managements, setManagements] = useState<{ idGerencia: number; nomeGerencia: string }[]>([]);
    const [userTypes, setUserTypes] = useState<{ idTipoUsuario: number; tipoUsuario: string }[]>([]);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        async function fetchManagements() {
            try {
                const data = await getAllActiveManagements();
                setManagements(data);
            } catch (error) {
                console.error("Erro ao buscar gerências ativas:", error);
            }
        }
        async function fetchUserTypes() {
            try {
                const data = await getAllUserTypes();
                setUserTypes(data);
            } catch (error) {
                console.error("Erro ao buscar tipos de usuário:", error);
            }
        }
        fetchManagements();
        fetchUserTypes();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PutUserSchema>({
        resolver: zodResolver(putUserSchema),
        defaultValues: {
            matricula: user.matricula,
            gerencia: String(user.gerencia),
            tipoUsuario: String(user.tipoUsuario),
        },
    });

    const handleFormSubmit = async (data: PutUserSchema) => {
        const payload = {
            idUsuario: user.idUsuario,
            matricula: data.matricula,
            gerencia: Number(data.gerencia),
            tipoUsuario: Number(data.tipoUsuario),
            nomeUsuario: user.nomeUsuario,
            email: user.email,
            ramal: user.ramal,
        };

        if (
            payload.matricula === user.matricula &&
            payload.gerencia === user.gerencia &&
            payload.tipoUsuario === user.tipoUsuario
        ) {
            setAlert({ type: "error", message: "Os dados informados são os mesmos já registrados. Nenhuma alteração foi feita." });
            return;
        }

        try {
            const response = await updateUser(payload);
            if (response.ok) {
                if (payload.idUsuario === loggedInUser?.id && payload.tipoUsuario !== loggedInUser.tipo) {
                    logout();
                    return;
                }
                onSuccess();
            } else {
                onError();
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            onError();
        }
    };

    const handleModalOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setAlert(null);
            onClose();
        }
    };

    return (
        <>
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
            <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Usuário</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="matricula" className="block text-sm font-medium">
                                Matrícula
                            </label>
                            <Input
                                type="text"
                                id="matricula"
                                {...register("matricula")}
                                className="input"
                                placeholder="Digite a matrícula"
                            />
                            {errors.matricula && (
                                <span className="text-red-500 text-sm">{errors.matricula.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="gerencia" className="block text-sm font-medium">
                                Gerência
                            </label>
                            <Controller
                                name="gerencia"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a gerência" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gerências</SelectLabel>
                                                {managements.map((management) => (
                                                    <SelectItem key={management.idGerencia} value={String(management.idGerencia)}>
                                                        {management.nomeGerencia}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gerencia && (
                                <span className="text-red-500 text-sm">{errors.gerencia.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="tipoUsuario" className="block text-sm font-medium">
                                Tipo de Acesso
                            </label>
                            <Controller
                                name="tipoUsuario"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione o tipo de acesso" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tipos de Acesso</SelectLabel>
                                                {userTypes.map((type) => (
                                                    <SelectItem key={type.idTipoUsuario} value={String(type.idTipoUsuario)}>
                                                        {type.tipoUsuario}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.tipoUsuario && (
                                <span className="text-red-500 text-sm">{errors.tipoUsuario.message}</span>
                            )}
                        </div>
                        <Button type="submit">Atualizar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
