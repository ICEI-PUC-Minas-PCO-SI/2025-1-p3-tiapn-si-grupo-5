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
    accessType: z.enum(["1", "2", "3"], {
        errorMap: () => ({ message: "Selecione um tipo de acesso" }),
    }),
    management: z.enum(["dcap", "gecea", "gesfo", "geted", "gevif"], {
        errorMap: () => ({ message: "Selecione uma gerência" }),
    }),
});

type CrudUserSchema = z.infer<typeof crudUserSchema>;

export function CrudUserForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CrudUserSchema>({
        resolver: zodResolver(crudUserSchema),
    });

    const handleFormSubmit = (data: CrudUserSchema) => {
        const dataToSubmit = {
            ...data,
            password: "Trackit123#",
        };
        console.log("Form Data Submitted:", dataToSubmit);
    };

    return (
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
                                    <SelectItem value="1">Admin</SelectItem>
                                    <SelectItem value="2">Analista</SelectItem>
                                    <SelectItem value="3">Usuário</SelectItem>
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
                                    <SelectItem value="dcap">DCAP</SelectItem>
                                    <SelectItem value="gecea">GECEA</SelectItem>
                                    <SelectItem value="gesfo">GESFO</SelectItem>
                                    <SelectItem value="geted">GETED</SelectItem>
                                    <SelectItem value="gevif">GEVIF</SelectItem>
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
            <Button type="submit">Salvar</Button>
        </form>
    );
}
