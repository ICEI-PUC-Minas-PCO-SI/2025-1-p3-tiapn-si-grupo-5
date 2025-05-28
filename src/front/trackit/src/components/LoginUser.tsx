{/* TODO: FIX LOGIN */ }

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";

type LoginFormData = {
    email: string;
    password: string;
};
const loginUserSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            "A senha deve conter pelo menos uma letra e um número"
        ),
});

type LoginUserSchema = z.infer<typeof loginUserSchema>;

export function LoginUser() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUserSchema>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        },
        resolver: zodResolver(loginUserSchema),
    });

    const { setUser } = useUser();

    async function handleLoginUser(data: LoginFormData) {
        const { email, password } = data;
        if (!email || !password) {
            setAlert({ type: "error", message: "Preencha todos os campos!" });
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha: password,
                }),
            });

            if (!response.ok) {
                setAlert({ type: "error", message: "Erro ao fazer login!" });
                return;
            }
            if (response.status === 200) {
                const resData = await response.json();
                setUser(resData.usuario, resData.token);
                navigate("/user");
            }

            

            setAlert({ type: "success", message: "Login realizado com sucesso!" });

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setAlert({ type: "error", message: "Falha ao fazer login. Tente novamente." });
        }

    }

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
            <form
                onSubmit={handleSubmit(handleLoginUser)}
                className="flex flex-col w-full h-full justify-start gap-4 px-[3rem]"
            >
                <div className="">
                    <label className="label-layout">E-mail:</label>
                    <Input placeholder="Digite seu e-mail" {...register("email")} />
                    {errors.email && (
                        <span className="text-red-500 text-sm font-'[Inter]'">{errors.email.message}</span>
                    )}
                </div>
                <div>
                    <label className="label-layout">Senha:</label>
                    <div className="relative w-full">
                        <Input
                            type={isShow ? "text" : "password"}
                            placeholder="Senha"
                            {...register("password")} // Ensure `password` is registered
                        />
                        <button
                            type="button"
                            onClick={handlePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={isShow ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {isShow ? (
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
                <Button type="submit">Login</Button>
            </form>
        </>
    );
}
