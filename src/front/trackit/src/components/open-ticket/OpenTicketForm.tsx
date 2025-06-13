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
import { useState, useEffect } from "react";
import { sendTicket } from "@/api/ticket";
import { useUser } from "@/contexts/UserContext";
import { getAllTicketTypes } from "@/api/tickettype";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";
import { Anexar } from "../annex/annex";

const openTicket = z.object({
    subject: z.string().min(1, {
        message: "O assunto é obrigatório!"
    }),
    priority: z.string().min(1, {
        message: "A prioridade é obrigatória!"
    }),
    type: z.string().min(1, "O tipo é obrigatório!"),
    description: z.string().min(5, "A descrição é obrigatória!")
});

type openTicket = z.infer<typeof openTicket>;

export function OpenTicketForm({ setAlert }: { setAlert: (alert: { type: "success" | "error"; message: string } | null) => void }) {
    const { user } = useUser();
    const [descLength, setDescLength] = useState(0);
    const [ticketTypes, setTicketTypes] = useState<{ idTipoChamado: number; nomeTipo: string }[]>([]);
    const [priorities, setPriorities] = useState<IPriority[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        // removido reset
    } = useForm<openTicket>({
        resolver: zodResolver(openTicket),
    });

    useEffect(() => {
        async function fetchTypesAndPriorities() {
            try {
                const types = await getAllTicketTypes();
                setTicketTypes(types);
            } catch {
                setTicketTypes([]);
            }
            try {
                const prioritiesData = await getAllPriorities();
                setPriorities(prioritiesData);
            } catch {
                setPriorities([]);
            }
        }
        fetchTypesAndPriorities();
    }, []);

    useEffect(() => {
        if (setAlert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [setAlert]);

    async function handleOpenTicket(data: openTicket) {
        if (!user) {
            setAlert({ type: "error", message: "Usuário não autenticado!" });
            return;
        }
        setIsSubmitting(true);
        const idPrioridade = Number(data.priority);
        const idTipoChamado = Number(data.type);

        if (!idPrioridade || !idTipoChamado) {
            setAlert({ type: "error", message: "Prioridade e tipo são obrigatórios." });
            setIsSubmitting(false);
            return;
        }

        const payload = {
            assunto: data.subject,
            descricao: data.description,
            idSolicitante: user.id,
            idPrioridade,
            idTipoChamado
        };

        try {
            const response = await sendTicket(payload);
            if (!response.ok) {
                setAlert({ type: "error", message: "Erro ao abrir chamado!" });
                setIsSubmitting(false);
                return;
            }
            setAlert({ type: "success", message: "Chamado aberto com sucesso!" });
            // Não faz reset(); apenas bloqueia os campos até redirecionar
        } catch (error) {
            setAlert({ type: "error", message: "Falha ao abrir chamado. Tente novamente." });
            setIsSubmitting(false);
            console.error(error);
        }
    }

    async function handleCancel(e: React.MouseEvent) {
        e.preventDefault();
        // Não faz reset
    }

    return (
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
                    disabled={isSubmitting}
                />
                {errors.subject && (
                    <span className="text-red-500 text-sm font-'[Inter]'">
                        {errors.subject.message}
                    </span>
                )}
            </div>
            <div>
                <label>Prioridade da demanda</label>
                <Controller
                    name="priority"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione a prioridade da demanda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione a prioridade da demanda</SelectLabel>
                                    {priorities.map((priority) => (
                                        <SelectItem key={priority.idPrioridade} value={String(priority.idPrioridade)}>
                                            <span style={{
                                                display: "inline-block",
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                backgroundColor: priority.hexCorPrimaria,
                                            }} /> 
                                            {priority.nomePrioridade}
                                        </SelectItem>
                                    ))}
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
                <label>Tipo da demanda</label>
                <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o tipo da demanda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione o tipo da demanda</SelectLabel>
                                    {ticketTypes.map((type) => (
                                        <SelectItem key={type.idTipoChamado} value={String(type.idTipoChamado)}>
                                            {type.nomeTipo}
                                        </SelectItem>
                                    ))}
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
                    maxLength={1500}
                    onChange={e => {
                        setDescLength(e.target.value.length);
                        register("description").onChange(e);
                    }}
                    disabled={isSubmitting}
                />
                <div className="flex justify-between items-end">
                    <div>
                        {errors.description && (
                            <span className="text-red-500 text-sm font-'[Inter]'">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 text-right mt-1">
                        {descLength}/1500 caracteres
                    </div>
                </div>
            </div>
            <Anexar />
            <footer className="flex justify-start gap-4">
                <Button type="submit" size="fit" disabled={isSubmitting} className="w-[11.25rem] max-w-[11.25rem]">
                    Abrir chamado
                </Button>
                <Button
                    className="text-slate-950 w-[11.25rem] max-w-[11.25rem] 
                        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] hover:text-slate-700 
                        hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.30)] transition-all duration-200 dark:text-slate-300"
                    variant={"outline"}
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
            </footer>
        </form>
    );
}
