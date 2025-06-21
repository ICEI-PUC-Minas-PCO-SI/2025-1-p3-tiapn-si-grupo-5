import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { getAllActiveManagementsPublic } from "@/api/management";
import { registerNewUser } from "@/api/auth";
import { GlobalAlert } from "@/components/ui/GlobalAlert";

const registerUserSchema = z.object({
    name: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras e espaços")
        .refine((val: string) => val.trim().split(" ").length >= 2, {
            message: "Informe o nome completo",
        }),
    registration: z.string()
        .min(4, "A matrícula deve ter pelo menos 4 dígitos")
        .regex(/^[0-9]{1,14}[0-9Xx]{1}$/, {
            message: "Matrícula inválida. Digite os números e o dígito verificador (ex: 123456X)"
        }),
    ramal: z.string()
        .regex(/^\d{10}$/, {
            message: "Ramal inválido. Deve conter exatamente 10 dígitos numéricos",
        }),
    administration: z
        .string()
        .refine((val: unknown) => typeof val === "string" && val.length > 0, { message: "Selecione uma gerência válida" })
        .refine((val: string) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Selecione uma gerência válida",
        }),
    email: z.string().email("E-mail inválido"),
    password: z
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            "A senha deve conter pelo menos uma letra e um número"
        ),
    confirmPassword: z.string().nonempty("Confirme a senha"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspodem",
    path: ["confirmPassword"],
});

type registerUserSchema = z.infer<typeof registerUserSchema>;

export function RegisterUser() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [managements, setManagements] = useState<{ idGerencia: number; nomeGerencia: string }[]>([]);
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        async function fetchManagements() {
            try {
                const data = await getAllActiveManagementsPublic();
                setManagements(data);
            } catch (error) {
                console.error("Erro ao buscar gerências ativas:", error);
            }
        }
        fetchManagements();
    }, []);

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const handlePassword = () => setIsShowPassword((prev) => !prev);
    const handleConfirmPassword = () => setIsShowConfirmPassword((prev) => !prev);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<registerUserSchema>({
        resolver: zodResolver(registerUserSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            registration: "",
            ramal: "",
            administration: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    async function handleRegisterUser(data: registerUserSchema) {
        const input = data.registration.toUpperCase();
        const numericPart = input.slice(0, -1);
        const verifier = input.slice(-1);
        const paddedNumericPart = numericPart.padStart(14, "0");
        const fullRegistration = paddedNumericPart + verifier;

        const payload = {
            nomeUsuario: data.name,
            matricula: fullRegistration,
            ramal: data.ramal,
            email: data.email,
            senha: data.password,
            gerencia: Number(data.administration),
            tipoUsuario: 3,
        };
        try {
            const response = await registerNewUser(payload);
            if (!response.ok) {
                let msg = "Erro ao cadastrar!";
                try {
                    const errorData = await response.json();
                    if (typeof errorData?.error === "string") {
                        msg = errorData.error;
                    }
                } catch {
                    // ignore
                }
                setAlert({ type: "error", message: msg });
                return;
            }
            setAlert({ type: "success", message: "Cadastro realizado com sucesso!" });
            setTimeout(() => {
                navigate(`/?email=${data.email}`);
            }, 1200);
        } catch (error) {
            console.error("Erro ao cadastrar! ", error);
            setAlert({ type: "error", message: "Falha ao cadastrar. Verifique os dados e tente novamente." });
        }
    }
    return (
        <>
            {alert && (
                <GlobalAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <form
                onSubmit={handleSubmit(handleRegisterUser)}
                className="flex flex-col w-full h-full justify-start gap-4 px-[3rem]"
            >
                <div>
                    <label>
                        Nome:
                    </label>
                    <Input type="text" placeholder="Digite seu nome completo" {...register("name")} />
                    {errors.name && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div>
                    <label>
                        Matrícula:
                    </label>
                    <Input type="text" placeholder="Digite sua matrícula (BM)" {...register("registration")} />
                    {errors.registration && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.registration.message}
                        </span>
                    )}
                </div>
                <div>
                    <label>
                        Ramal:
                    </label>
                    <Input type="tel" placeholder="Ramal" {...register("ramal")} />
                    {errors.ramal && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.ramal.message}
                        </span>
                    )}
                </div>

                <div>
                    <label>
                        Gerência:
                    </label>
                    <Controller 
                        name="administration"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione sua gerência" />
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
                    {errors.administration && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.administration.message}
                        </span>
                    )}
                </div>
                <div>
                    <label>E-mail:</label>
                    <Input placeholder="Digite seu e-mail" {...register("email")} />
                    {errors.email && (
                        <span className="text-red-500 text-sm font-'[Inter]'">{errors.email.message}</span>
                    )}
                </div>

                <div>
                    <label>Senha:</label>
                    <div className="relative w-full">
                        <Input
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Senha"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={handlePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={isShowPassword ? "Ocultar senha" : "Mostrar senha"}
                            tabIndex={-1}
                        >
                            {isShowPassword ? (
                                <IoEyeOffOutline size={24} />
                            ) : (
                                <IoEyeOutline size={24} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <label>
                        Confirmar senha:
                    </label>
                    <div className="relative w-full">
                        <Input
                            type={isShowConfirmPassword ? "text" : "password"}
                            placeholder="Digite novamente a senha"
                            {...register("confirmPassword")} />
                        <button
                            type="button"
                            onClick={handleConfirmPassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={isShowConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            tabIndex={-1}
                        >
                            {isShowConfirmPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm font-'[Inter]'">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                {/*TODO: TOOLTIP UX*/}
                <Button type="submit" disabled={!isValid}>
                    Cadastre-se
                </Button>
            </form>
        </>
    );
}