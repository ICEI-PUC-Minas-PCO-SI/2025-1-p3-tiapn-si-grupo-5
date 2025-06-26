import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";
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
import type { INewTicket } from "@/api/ticket";
import { useUser } from "@/contexts/UserContext";
import { getAllTicketTypes } from "@/api/tickettype";
import { getAllPriorities } from "@/api/priority";
import type { IPriority } from "@/api/priority";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/api/upload";

const openTicket = z.object({
    subject: z.string()
        .min(1, { message: "O assunto é obrigatório!" })
        .max(30, { message: "O assunto deve ter no máximo 30 caracteres!" }),
    priority: z.string().min(1, {
        message: "A prioridade é obrigatória!"
    }),
    type: z.string().min(1, "O tipo é obrigatório!"),
    description: z.string().min(5, "A descrição é obrigatória!")
});

type openTicket = z.infer<typeof openTicket>;

// Schema Zod para validação do dialog de anexo
const attachSchema = z.object({
    nomeArquivo: z.string().min(3, "O nome do arquivo deve ter pelo menos 3 caracteres"),
    file: z
        .instanceof(File, { message: "Selecione um arquivo para anexar" })
});

export function OpenTicketForm({ setAlert }: { setAlert: (alert: { type: "success" | "error"; message: string } | null) => void }) {
    const { user } = useUser();
    const [descLength, setDescLength] = useState(0);
    const [ticketTypes, setTicketTypes] = useState<{ idTipoChamado: number; nomeTipo: string }[]>([]);
    const [priorities, setPriorities] = useState<IPriority[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [anexoUrl, setAnexoUrl] = useState<string | null>(null);
    const [anexoNome, setAnexoNome] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dialogNomeArquivo, setDialogNomeArquivo] = useState("");
    const [dialogFile, setDialogFile] = useState<File | null>(null);
    const [dialogErrors, setDialogErrors] = useState<{ nomeArquivo?: string; file?: string }>({});
    const [anexoReady, setAnexoReady] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
        watch,
    } = useForm<openTicket>({
        resolver: zodResolver(openTicket),
        mode: "onChange",
    });

    const watchedValues = watch();

    const isFormValid = isValid &&
        watchedValues.subject?.trim() &&
        watchedValues.priority &&
        watchedValues.type &&
        watchedValues.description?.trim();

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

    const handleUpload = async () => {
        const result = attachSchema.safeParse({
            nomeArquivo: dialogNomeArquivo,
            file: dialogFile,
        });
        if (!result.success) {
            const errors: { nomeArquivo?: string; file?: string } = {};
            for (const err of result.error.errors) {
                if (err.path[0] === "nomeArquivo") errors.nomeArquivo = err.message;
                if (err.path[0] === "file") errors.file = err.message;
            }
            setDialogErrors(errors);
            return;
        }
        setDialogErrors({});
        setUploading(true);
        try {
            const resultUpload = await uploadFile(dialogFile!, undefined, setUploadProgress);
            setAnexoUrl(resultUpload.url);
            setAnexoNome(dialogNomeArquivo || dialogFile!.name);
            setAnexoReady(true);
            setOpenDialog(false);
            setDialogNomeArquivo("");
            setDialogFile(null);
        } catch (error) {
            setAlert({ type: "error", message: "Erro ao anexar arquivo" });
            console.error("Erro ao fazer upload:", error);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

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

        const payload: INewTicket = {
            assunto: data.subject,
            descricao: data.description,
            idSolicitante: user.id,
            idPrioridade,
            idTipoChamado
        };
        if (anexoUrl && anexoNome) {
            payload.urlAnexo = anexoUrl;
            payload.nomeArquivo = anexoNome;
        }

        try {
            const response = await sendTicket(payload);
            if (!response.ok) {
                setAlert({ type: "error", message: "Erro ao abrir chamado!" });
                setIsSubmitting(false);
                return;
            }
            setAlert({ type: "success", message: "Chamado aberto com sucesso!" });
            setAnexoUrl(null);
            setAnexoNome(null);
            setAnexoReady(false);
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

    const handleDialogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDialogFile(e.target.files[0]);
        }
    };

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
                <Button
                    size="fit"
                    variant="outline"
                    type="button"
                    onClick={() => setOpenDialog(true)}
                    disabled={isSubmitting || uploading}
                    className={`${anexoReady ? "bg-green-600 hover:bg-green-700 text-white border-green-700" : ""}`}
                >
                    <Paperclip className="mr-2" />
                    Anexar
                </Button>
                {!anexoReady && anexoNome && (
                    <span className="block mt-2 text-sm text-green-700">
                        Arquivo anexado: {anexoNome}
                    </span>
                )}
                {anexoReady && anexoNome && (
                    <span className="block mt-2 text-sm text-green-700 font-medium">
                        ✓ Arquivo pronto: {anexoNome}
                    </span>
                )}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Anexar arquivo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Nome do arquivo"
                            value={dialogNomeArquivo}
                            onChange={e => setDialogNomeArquivo(e.target.value)}
                            disabled={uploading}
                        />
                        {dialogErrors.nomeArquivo && (
                            <span className="text-red-500 text-xs mb-1">{dialogErrors.nomeArquivo}</span>
                        )}
                        <div>
                            <Input
                                type="file"
                                accept="image/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                                onChange={handleDialogFileChange}
                                disabled={uploading}
                                className="flex-1"
                            />
                            {dialogFile && (
                                <span className="block text-xs text-slate-700 mt-1 truncate max-w-[180px]">
                                    {dialogFile.name}
                                </span>
                            )}
                            <span className="text-xs text-slate-500 block mt-1">
                                Imagens, PDFs ou planilhas. Tamanho máximo: 10MB.
                            </span>
                            {dialogErrors.file && (
                                <span className="text-red-500 text-xs">{dialogErrors.file}</span>
                            )}
                        </div>
                        {uploading && (
                            <Progress value={uploadProgress} className="w-full mt-2" />
                        )}
                    </div>
                    <DialogFooter className="mt-2">
                        <Button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            Anexar
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            disabled={uploading}
                        >
                            Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <footer className="flex justify-start gap-4">
                <Button
                    type="submit"
                    size="fit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-[11.25rem] max-w-[11.25rem]"
                >
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