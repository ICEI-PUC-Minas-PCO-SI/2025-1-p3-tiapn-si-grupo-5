import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { data } from "react-router";

const openTicket = z.object({
    subject: z.string().min(1, {
        message: "O assunto é obrigatório!"
    }),
    priority: z.string().min(1, {
        message: "A prioridade é obrigatória"
    }),
    type: z.string().min(1, "O tipo é obrigatório"),
    description: z.string()
})

type openTicket = z.infer<typeof openTicket>;

export function OpenTicket() {
    const [] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<openTicket>({
        resolver: zodResolver(openTicket),
    });
    
    async function handleOpenTicket(data: openTicket) {
        console.log("Chamado aberto com sucesso!", data);
    }
    async function handleCancel(e: React.MouseEvent) {
        e.preventDefault();
        reset();
        console.log("Chamado cancelado");
    }

    return (
        <div className="flex flex-col gap-[2rem]">
            <header className="max-w-[51.4rem]">
                <h1 className="title-h1">Preencha o chamado com as informações solicitadas</h1>
            </header>
            <main>
                <form
                    onSubmit={handleSubmit(handleOpenTicket)}
                    className="flex flex-col gap-[2rem] max-w-[51.3rem]"
                >
                    <div>
                        <label>Assunto da demanda</label>
                        <Input
                            type="text"
                            placeholder="Digite o assunto da demanda"
                            {...register("subject")}
                        />
                        {errors.subject && (
                            <span className="text-red-500 text-sm font-'[Inter]'">
                                {errors.subject.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="priority"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a prioridade da demanda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Selecione a prioridade da demanda</SelectLabel>
                                            <SelectItem value="1">
                                                <div className="w-[16px] h-[16px] rounded-[6px] bg-green-600"></div>
                                                Baixa
                                            </SelectItem>
                                            <SelectItem value="2">
                                                <div className="w-[16px] h-[16px] rounded-[6px] bg-yellow-400"></div>
                                                Média
                                            </SelectItem>
                                            <SelectItem value="3">
                                                <div className="w-[16px] h-[16px] rounded-[6px] bg-red-600"></div>
                                                Alta
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.priority && (
                            <span className="text-red-500 text-sm font-'[Inter]'">
                                {errors.priority.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o tipo da demanda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Selecione o tipo da demanda</SelectLabel>
                                            <SelectItem value="a">Mouse</SelectItem>
                                            <SelectItem value="f">teclado</SelectItem>
                                            <SelectItem value="h">asdads</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && (
                            <span className="text-red-500 text-sm font-'[Inter]'">
                                {errors.type.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label>Descrição da demanda</label>
                        <Textarea
                            {...register("description")}
                            placeholder="Digite a descrição da demanda"
                            style={{ resize: "none" }}
                        />
                    </div>

                    {/* Anexar arquivo a ser implementado */}

                    <footer className="flex justify-start gap-[4rem]">
                        <Button type="submit" className="button-other w-[11.25rem] max-w-[11.25rem]">
                            Abrir chamado
                        </Button>
                        <Button 
                        className="text-slate-950 w-[11.25rem] max-w-[11.25rem] 
                        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] hover:text-slate-700 
                        hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.30)] transition-all duration-200" variant={"outline"}
                        type="button"
                        onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                    </footer>
                </form>
            </main>
        </div>
    );
}