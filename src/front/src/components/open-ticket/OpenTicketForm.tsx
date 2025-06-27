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
        reset,
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
        reset({
            subject: "",
            priority: "",
            type: "",
            description: ""
        });
        setDescLength(0);
        setAnexoUrl(null);
        setAnexoNome(null);
        setAnexoReady(false);
        setDialogNomeArquivo("");
        setDialogFile(null);
        setDialogErrors({});
    }

    const handleDialogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDialogFile(e.target.files[0]);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleOpenTicket)}
            className="flex flex-col gap-4 md:gap-8 max-w-full md:max-w-[51.3rem] w-full"
        >
            <div className="w-full">
                <label className="block text-sm md:text-base font-medium mb-2">Assunto da demanda</label>
                <Input
                    type="text"
                    placeholder="Digite o assunto da demanda"
                    {...register("subject")}
                    disabled={isSubmitting}
                    className="w-full text-sm md:text-base"
                />
                {errors.subject && (
                    <span className="text-red-500 text-xs md:text-sm font-'[Inter]' mt-1 block">
                        {errors.subject.message}
                    </span>
                )}
            </div>
            <div className="w-full">
                <label className="block text-sm md:text-base font-medium mb-2">Prioridade da demanda</label>
                <Controller
                    name="priority"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                            <SelectTrigger className="w-full text-sm md:text-base">
                                <SelectValue placeholder="Selecione a prioridade da demanda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-xs md:text-sm">Selecione a prioridade da demanda</SelectLabel>
                                    {priorities.map((priority) => (
                                        <SelectItem key={priority.idPrioridade} value={String(priority.idPrioridade)} className="text-sm md:text-base">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="inline-block w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: priority.hexCorPrimaria }}
                                                />
                                                <span className="truncate">{priority.nomePrioridade}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.priority && (
                    <span className="text-red-500 text-xs md:text-sm font-'[Inter]' mt-1 block">
                        {errors.priority.message}
                    </span>
                )}
            </div>
            <div className="w-full">
                <label className="block text-sm md:text-base font-medium mb-2">Tipo da demanda</label>
                <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                            <SelectTrigger className="w-full text-sm md:text-base">
                                <SelectValue placeholder="Selecione o tipo da demanda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-xs md:text-sm">Selecione o tipo da demanda</SelectLabel>
                                    {ticketTypes.map((type) => (
                                        <SelectItem key={type.idTipoChamado} value={String(type.idTipoChamado)} className="text-sm md:text-base">
                                            <span className="truncate">{type.nomeTipo}</span>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.type && (
                    <span className="text-red-500 text-xs md:text-sm font-'[Inter]' mt-1 block">
                        {errors.type.message}
                    </span>
                )}
            </div>
            <div className="w-full">
                <label className="block text-sm md:text-base font-medium mb-2">Descrição da demanda</label>
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
                    className="w-full min-h-[120px] md:min-h-[150px] text-sm md:text-base"
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-2">
                    <div className="order-2 sm:order-1">
                        {errors.description && (
                            <span className="text-red-500 text-xs md:text-sm font-'[Inter]'">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                    <div className="text-xs md:text-sm text-slate-500 order-1 sm:order-2">
                        {descLength}/1500 caracteres
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => setOpenDialog(true)}
                    disabled={isSubmitting || uploading}
                    className={`mt-3 w-full sm:w-auto ${anexoReady ? "bg-green-600 hover:bg-green-700 text-white border-green-700" : ""}`}
                >
                    <Paperclip className="mr-2 w-4 h-4" />
                    Anexar
                </Button>
                {!anexoReady && anexoNome && (
                    <span className="block mt-2 text-xs md:text-sm text-green-700 truncate">
                        Arquivo anexado: {anexoNome}
                    </span>
                )}
                {anexoReady && anexoNome && (
                    <span className="block mt-2 text-xs md:text-sm text-green-700 font-medium truncate">
                        ✓ Arquivo pronto: {anexoNome}
                    </span>
                )}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-[95vw] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base md:text-lg">Anexar arquivo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Nome do arquivo"
                            value={dialogNomeArquivo}
                            onChange={e => setDialogNomeArquivo(e.target.value)}
                            disabled={uploading}
                            className="text-sm md:text-base"
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
                                className="flex-1 text-sm md:text-base"
                            />
                            {dialogFile && (
                                <span className="block text-xs text-slate-700 mt-1 truncate max-w-full">
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
                    <DialogFooter className="mt-2 flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full sm:w-auto"
                        >
                            Anexar
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            disabled={uploading}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <footer className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 mt-4">
                <Button
                    type="submit"
                    size="default"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full sm:w-auto sm:min-w-[11.25rem] text-sm md:text-base"
                >
                    {isSubmitting ? "Abrindo..." : "Abrir chamado"}
                </Button>
                <Button
                    className="w-full sm:w-auto sm:min-w-[11.25rem] text-slate-950 
                        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] hover:text-slate-700 
                        hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.30)] transition-all duration-200 dark:text-slate-300 text-sm md:text-base"
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