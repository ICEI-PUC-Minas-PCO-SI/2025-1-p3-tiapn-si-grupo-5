import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { GlobalAlert } from "@/components/ui/GlobalAlert";
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";
import { loginUser } from "@/api/users";

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
        formState: { errors, isValid },
    } = useForm<LoginUserSchema>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        },
        resolver: zodResolver(loginUserSchema),
        mode: "onChange",
    });

    const { setUser } = useUser();

    async function handleLoginUser(data: LoginFormData) {
        const { email, password } = data;
        if (!email || !password) {
            setAlert({ type: "error", message: "Preencha todos os campos!" });
            return;
        }
        try {
            const response = await loginUser({ email, senha: password });
            if (!response.ok) {
                setAlert({ type: "error", message: "Erro ao fazer login!" });
                return;
            }
            if (response.status === 200) {
                const resData = await response.json();
                setUser(resData.usuario, resData.token);
                if (resData.usuario.tipo === 1) {
                    navigate("/admin");
                } else if (resData.usuario.tipo === 2) {
                    navigate("/analyst");
                } else {
                    navigate("/user");
                }
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setAlert({ type: "error", message: "Falha ao fazer login. Tente novamente." });
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
                            {...register("password")}
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
                <Button type="submit" disabled={!isValid}>
                    Login
                </Button>
            </form>
        </>
    );
}
