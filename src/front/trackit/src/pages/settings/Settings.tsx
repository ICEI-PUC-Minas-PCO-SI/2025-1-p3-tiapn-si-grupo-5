import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, CircleCheckBig, Shield } from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const settingsSchema = z.object({
    name: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras e espaços")
        .refine((val) => val.trim().split(" ").length >= 2, {
            message: "Informe o nome completo",
        }),
    email: z.string().email("E-mail inválido"),
    ramal: z.string()
        .regex(/^\d{4,10}$/, {
            message: "Ramal inválido. Deve conter entre 4 e 10 dígitos numéricos",
        }),
});

type SettingsSchema = z.infer<typeof settingsSchema>;

export function Settings() {
    const { user } = useUser();
    const name = user?.nome || "Usuário";
    const avatarUrl = user?.fotoPerfil || undefined;
    const matricula = user?.matricula || "Não informado";
    const nomeGerencia = user?.nomeGerencia || "Não informado";
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
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

    function onSubmit(data: SettingsSchema) {
        // TODO: Chamar API para salvar alterações
        // Exibir feedback de sucesso
    }

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="title-h1 text-slate-950">Configurações</h1>
                <h2 className="title-h3 text-slate-700">Aqui você pode editar os dados da sua conta.</h2>
            </div>
            <header className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={name} />
                    ) : (
                        <AvatarFallback>
                            {name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div className="flex flex-col gap-4">
                    <UploadButton size="fit">
                        <ImagePlus className="mr-2" />
                        Enviar foto
                    </UploadButton>
                    <div className="flex gap-3 items-center">
                        {user?.tipo === 1 ? (
                            <>
                                <CircleCheckBig className="inline-block text-green-600" />
                                <p className="menu-2 text-green-600">
                                    Gestor da Astin
                                </p>
                            </>
                        ) : user?.tipo === 2 ? (
                            <>
                                <CircleCheckBig className="inline-block text-green-600" />
                                <p className="menu-2 text-green-600">
                                    Analista da Astin
                                </p>
                            </>
                        ) : null}
                    </div>
                </div>
            </header>
            <main className="flex flex-col">
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
                                placeholder="usuário"
                                autoComplete="off"
                                inputMode="text"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs">{errors.name.message}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label>Matrícula:</label>
                            <Input
                                type="text"
                                value={matricula}
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
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label>Ramal:</label>
                            <Input
                                type="text"
                                {...register("ramal")}
                                placeholder="XXXX-YYYY"
                                autoComplete="off"
                                inputMode="numeric"
                            />
                            {errors.ramal && (
                                <span className="text-red-500 text-xs">{errors.ramal.message}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label>Gerência:</label>
                            <Input
                                type="text"
                                value={nomeGerencia}
                                disabled
                                className="bg-slate-100 cursor-not-allowed"
                                placeholder="ASTIN"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="fit"
                        >
                            <Shield />
                            Trocar senha
                        </Button>
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit" className="w-40">
                            Salvar
                        </Button>
                        <Button variant="outline"
                            size="fit"
                            type="button"
                            onClick={console.log("Cancelar")}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}