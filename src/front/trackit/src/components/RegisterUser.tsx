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
import { toast } from "sonner";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';


// Schema de validação com Zod
const registerUserSchema = z.object({
    name: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras e espaços")
        .refine((val) => val.trim().split(" ").length >= 2, {
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
        },
        ),
    administration: z.enum(["1", "2", "3", "4"], {
        errorMap: () => ({ message: "Selecione uma gerência" })
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
})

type registerUserSchema = z.infer<typeof registerUserSchema>;

export function RegisterUser() {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<registerUserSchema>({
        resolver: zodResolver(registerUserSchema),
    });

    // Função que exibe os dados que o usuário digitou em ambos os inputs. Na integração com a API, essa função deve ser substituída pela chamada à API de login.
    async function handleRegisterUser(data: registerUserSchema) {
        const input = data.registration.toUpperCase();
        const numericPart = input.slice(0, -1);
        const verifier = input.slice(-1);

        const paddedNumericPart = numericPart.padStart(14, '0');
        const fullRegistration = paddedNumericPart + verifier;

        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeUsuario: data.name,
                    matricula: fullRegistration,
                    ramal: data.ramal,
                    email: data.email,
                    senha: data.password,
                    gerencia: data.administration,
                }),
            });

            if (!response.ok) {
                toast.error("Erro ao cadastrar!");
                return;
            }

            toast.success("Cadastro realizado com sucesso!");  
            setTimeout(() => {
            navigate(`/?email=${data.email}`);
            }, 1200);
 

        } catch (error) {
            console.error("Erro ao cadastrar!");
            alert("Falha ao cadastrar. Verifique os dados e tente novamente.");
        }
    }

    return (
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
                                    <SelectItem value="1">Assessoria de Tecnologia da Informação (ASTIN)</SelectItem>

                                    <SelectItem value="4">Gerência de Gestão da Folha de Pagamento (GESFO)</SelectItem>
                                    <SelectItem value="2">Gerência de Gestão de Direitos e Benefícios (GETED)</SelectItem>
                                    <SelectItem value="3">Gerência de Gestão de Ingresso e da Vida Funcional (GEVIF)</SelectItem>
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
            <div className="w-full">
                <label>
                    Confirmar senha:
                </label>
                <div className="relative w-full">
                    <Input
                        type={isShow ? "text" : "password"}
                        placeholder="Digite novamente a senha"
                        {...register("confirmPassword")} />

                    <button onClick={handlePassword} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 focus: outline-0" >
                        {!isShow && <IoEyeOutline size={24} />}
                        {isShow && <IoEyeOffOutline size={24} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm font-'[Inter]'">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </div>
            <Button type="submit">Cadastre-se</Button>
        </form>
    );
}