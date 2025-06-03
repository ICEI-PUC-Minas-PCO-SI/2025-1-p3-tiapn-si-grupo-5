{/*É preciso criar um arquivo .env na raiz do frontend (/trackit), com a variável DEFAULT_TRACKIT_PASSWORD, que é a senha padrão utilizada para a criação de usuários via gestor*/ }

import { useEffect, useState } from "react";
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
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { getAllActiveManagements } from "@/api/management";
import { getAllUserTypes } from "../api/usertypes";
import { registerNewUser } from "@/api/users";

const crudUserSchema = z.object({
    name: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "O nome deve conter apenas letras e espaços"
        )
        .refine((val) => val.trim().split(" ").length >= 2, {
            message: "Informe o nome completo",
        }),
    matricula: z
        .string()
        .min(4, "A matrícula deve ter pelo menos 4 dígitos")
        .regex(/^[0-9]{1,14}[0-9Xx]{1}$/, {
            message:
                "Matrícula inválida. Digite os números e o dígito verificador (ex: 123456X)",
        }),
    ramal: z.string().regex(/^\d{10}$/, {
        message: "Ramal inválido. Deve conter exatamente 10 dígitos numéricos",
    }),
    email: z.string().email("E-mail inválido"),
    accessType: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Selecione um tipo de acesso válido",
    }),
    management: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Selecione uma gerência válida",
    }),
});

type CrudUserSchema = z.infer<typeof crudUserSchema>;

export function CrudUserForm({ onSuccess }: { onSuccess: () => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [managements, setManagements] = useState<{ idGerencia: number; nomeGerencia: string }[]>([]);
    const [userTypes, setUserTypes] = useState<{ idTipoUsuario: number; tipoUsuario: string }[]>([]);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
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
        reset,
        formState: { errors },
    } = useForm<CrudUserSchema>({
        resolver: zodResolver(crudUserSchema),
    });

    const handleModalOpenChange = (isOpen: boolean) => {
        setIsModalOpen(isOpen);
        if (isOpen) {
            reset();
        }
    };

    const handleFormSubmit = async (data: CrudUserSchema) => {
        const input = data.matricula.toUpperCase();
        const numericPart = input.slice(0, -1);
        const verifier = input.slice(-1);
        const paddedNumericPart = numericPart.padStart(14, "0");
        const fullRegistration = paddedNumericPart + verifier;

        const payload = {
            nomeUsuario: data.name,
            matricula: fullRegistration,
            ramal: data.ramal,
            email: data.email,
            senha: String(import.meta.env.VITE_DEFAULT_TRACKIT_PASSWORD),
            gerencia: Number(data.management),
            tipoUsuario: Number(data.accessType),
        };
        console.log(payload.senha)
        try {
            const response = await registerNewUser(payload);
            if (response.ok) {
                setAlert({ type: "success", message: "Usuário criado com sucesso!" });
                setIsModalOpen(false);
                onSuccess();
            } else {
                setAlert({ type: "error", message: "Erro ao criar usuário. Verifique os dados e tente novamente." });
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setAlert({ type: "error", message: "Erro ao criar usuário. Verifique os dados e tente novamente." });
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
                <DialogTrigger asChild>
                    <Button size="sm">Criar Usuário</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar Usuário</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Nome
                            </label>
                            <Input
                                type="text"
                                id="name"
                                {...register("name")}
                                className="input"
                                placeholder="Digite o nome completo"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                        </div>
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
                                <span className="text-red-500 text-sm">
                                    {errors.matricula.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="ramal" className="block text-sm font-medium">
                                Ramal
                            </label>
                            <Input
                                type="text"
                                id="ramal"
                                {...register("ramal")}
                                className="input"
                                placeholder="Digite o ramal"
                            />
                            {errors.ramal && (
                                <span className="text-red-500 text-sm">{errors.ramal.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                E-mail
                            </label>
                            <Input
                                type="email"
                                id="email"
                                {...register("email")}
                                className="input"
                                placeholder="Digite o e-mail"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="accessType" className="block text-sm font-medium">
                                Tipo de Acesso
                            </label>
                            <Controller
                                name="accessType"
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
                            {errors.accessType && (
                                <span className="text-red-500 text-sm">
                                    {errors.accessType.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="management" className="block text-sm font-medium">
                                Gerência
                            </label>
                            <Controller
                                name="management"
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
                            {errors.management && (
                                <span className="text-red-500 text-sm">
                                    {errors.management.message}
                                </span>
                            )}
                        </div>
                        <Button type="submit">Criar</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
