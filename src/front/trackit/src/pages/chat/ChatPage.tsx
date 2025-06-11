import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Chat from "@/components/chat/Chat";

export function ChatPage() {
    // Exemplo de tipos de demanda
    const tipos = [
        { id: 1, nome: "Incidente", cor: "#f87171" },
        { id: 2, nome: "Requisição", cor: "#60a5fa" },
        { id: 3, nome: "Dúvida", cor: "#fbbf24" },
    ];

    const analystName = "Fulano";
    const dataTicketCreated = "01/01/2025";
    const dataTicketClosed = "07/01/2025";

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4 items-center">
                        <h1 className="title-h1 text-slate-950">
                            Assunto da demanda
                        </h1>
                        <Badge variant="outline" className="h-10">
                            #XXXXXXXXYY
                        </Badge>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Badge className="h-10 bg-red-600 text-slate-950">
                            Prioridade
                        </Badge>
                        <Select>
                            <SelectTrigger className="min-w-[100px] min-h-[40px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {tipos.map(tipo => (
                                        <SelectItem key={tipo.id} value={String(tipo.id)}>
                                            {tipo.nome}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="title-h2 text-slate-800">
                        Tipo de demanda
                    </h2>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="paragraph text-slate-700">
                        Analista Responsável: {analystName}
                    </span>
                    <span className="paragraph text-slate-700">
                        Data de Abertura: {dataTicketCreated}
                    </span>
                    <span className="paragraph text-slate-700">
                        Data de Fechamento: {dataTicketClosed}
                    </span>  
                </div>
                <Separator />
            </header>
            <Chat />
        </div>
    )
}