import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

// Schema de validação com Zod
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
    const [searchParams] = useSearchParams();

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

    // Função que exibe os dados que o usuário digitou em ambos os inputs. Na integração com a API, essa função deve ser substituída pela chamada à API de login.
    async function handleLoginUser(data: LoginUserSchema) {
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    senha: data.password,
                }),
            });

            if (!response.ok) {
                toast.error("Erro ao cadastrar!");
                return;
            }

            toast.success("Cadastro realizado com sucesso!");


        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    return (
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
            <Button type="submit">Login</Button>
        </form>
    );
}
