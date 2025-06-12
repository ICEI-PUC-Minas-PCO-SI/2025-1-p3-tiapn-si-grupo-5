import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Message } from "@/components/ui/Message";

const mockMessages = [
    {
        id: 1,
        user: "Nome do usuário",
        text: "Lorem ipsum dolor sit amet. Hic sint officia sit aliquid blanditiis non voluptatem accusantium est tempore numquam in distinctio facilis. Et architecto velit et quas tempore ut obcaecati dolorum.\nEt fugiat ipsum ut quo vitae et quia porro est earum quidem et minus delectus ea velit eveniet. Sed ipsa illum ex iusto dignissimos At beatae molestiae. Qui iusto ut maiores voluptatem eum esse praesentium ex adipisci quia ut perspiciatis minima et sunt architecto. Et mollitia corporis ut impedit amet qui molestias adit",
        time: "14:32 | 10/04/2024",
        isCurrentUser: false,
    },
    {
        id: 2,
        user: "Nome do usuário",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        time: "14:35 | 10/04/2024",
        isCurrentUser: true,
    },
];

interface ChatProps {
    descricao: string;
}

export default function Chat({ descricao }: ChatProps) {
    const [showDescricao, setShowDescricao] = useState(false);

    return (
        <div className="flex flex-col w-full mx-auto border rounded bg-white min-h-[600px]">
            {/* Header com botão retração */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-semibold text-base">Chat</span>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Retrair/Expandir"
                    onClick={() => setShowDescricao((v) => !v)}
                >
                    {showDescricao ? <ChevronsLeft /> : <ChevronsRight />}
                </Button>
            </div>
            <div className="min-h-[520px] w-full flex">
                <div className={`transition-all duration-400 ${showDescricao ? "w-1/2 border-r" : "w-full"}`}>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-6">
                            {mockMessages.map((msg) => (
                                <Message
                                    key={msg.id}
                                    user={msg.user}
                                    time={msg.time}
                                    text={msg.text}
                                    isCurrentUser={msg.isCurrentUser}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Conteúdo da descrição */}
                {showDescricao && (
                    <div className="flex flex-col bg-white w-1/2 min-w-[240px] max-w-[50vw] overflow-hidden">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                            <span className="font-semibold text-base">Descrição da demanda</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDescricao(false)}
                                aria-label="Ocultar descrição"
                            >
                            </Button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto" style={{ height: "520px" }}>
                            <div className="whitespace-pre-line text-slate-900 text-sm">
                                {descricao}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form className="flex items-end gap-2 border-t px-4 py-3 bg-white">
                <Button className="h-11" type="button" variant="outlineDisabled" size="icon">
                    <Paperclip className="w-5 h-5" />
                </Button>
                <Textarea
                    className="resize-none min-h-[44px] max-h-32 flex-1"
                    placeholder="Digite sua mensagem..."
                    rows={1}
                />
                <Button
                    type="submit"
                    className="h-11 w-11 p-0 rounded-full"
                    variant="default"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </form>
        </div>
    );
}