import { useUser } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateProfileUser } from "@/api/users";

const settingsSchema = z.object({
    name: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras e espaços")
        .refine((val) => val.trim().split(" ").length >= 2, {
            message: "Informe o nome completo",
        }),
    email: z.string().email("E-mail inválido"),
    ramal: z.string().regex(/^\d{10}$/, {
        message: "Ramal inválido. Deve conter entre 4 e 10 dígitos numéricos",
    }),
});

type SettingsSchema = z.infer<typeof settingsSchema>;

type SettingsUserFormProps = {
    onFeedback: (type: "success" | "error", message: string) => void;
};

export function SettingsUserForm({ onFeedback }: SettingsUserFormProps) {
    const { user, setUser } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<SettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.nome || "",
            email: user?.email || "",
            ramal: user?.ramal || "",
        },
    });

    useEffect(() => {
        reset({
            name: user?.nome || "",
            email: user?.email || "",
            ramal: user?.ramal || "",
        });
    }, [user, reset]);

    const watched = watch();

    const isChanged =
        watched.name !== (user?.nome || "") ||
        watched.email !== (user?.email || "") ||
        watched.ramal !== (user?.ramal || "");

    const hasErrors = !!errors.name || !!errors.email || !!errors.ramal;

    async function onSubmit(data: SettingsSchema) {
        if (!user) return;
        if (!isChanged) {
            onFeedback("error", "Nenhuma alteração detectada.");
            return;
        }
        try {
            const response = await updateProfileUser(
                user.id,
                { nome: data.name, email: data.email, ramal: data.ramal }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                onFeedback("error", errorData.error || "Erro ao atualizar usuário!");
                return;
            }

            const updatedUserData = await response.json();
            setUser({
                ...user,
                nome: updatedUserData.nome || data.name,
                email: updatedUserData.email || data.email,
                ramal: updatedUserData.ramal || data.ramal
            });

            onFeedback("success", "Dados atualizados com sucesso!");
        } catch (error) {
            console.error("Erro na atualização:", error);
            onFeedback("error", "Erro ao atualizar usuário!");
        }
    }

    return (
        <form
            className="flex flex-col gap-6 max-w-xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-4">
                <div className="flex-1">
                    <label>Nome:</label>
                    <Input
                        type="text"
                        {...register("name")}
                        placeholder="Nome Completo"
                        autoComplete="off"
                        inputMode="text"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>
                <div className="flex-1">
                    <label>Matrícula:</label>
                    <Input
                        type="text"
                        value={user?.matricula || "Não informado"}
                        disabled
                        className="bg-slate-100 cursor-not-allowed"
                        placeholder="XXXXXXXX-Y"
                    />
                </div>
            </div>
            <div>
                <label className="block mb-1 font-medium">E-mail:</label>
                <Input
                    type="email"
                    {...register("email")}
                    placeholder="email@example.com"
                    autoComplete="off"
                    inputMode="email"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label>Ramal:</label>
                    <Input
                        type="text"
                        {...register("ramal")}
                        placeholder="31XXXXYYYY"
                        autoComplete="off"
                        inputMode="numeric"
                    />
                    {errors.ramal && (
                        <span className="text-red-500 text-sm">{errors.ramal.message}</span>
                    )}
                </div>
                <div className="flex-1">
                    <label>Gerência:</label>
                    <Input
                        type="text"
                        value={user?.nomeGerencia || "Não informado"}
                        disabled
                        className="bg-slate-100 cursor-not-allowed"
                        placeholder="ASTIN"
                    />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Button
                    type="button"
                    variant="outlineDisabled"
                    size="fit"
                >
                    <Shield />
                    Trocar senha
                </Button>
            </div>
            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="w-40"
                    disabled={isSubmitting || !isChanged || hasErrors}
                >
                    Salvar
                </Button>
                <Button variant="outline"
                    size="fit"
                    type="button"
                    onClick={() => reset()}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
