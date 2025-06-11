import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, ChevronsRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
        isCurrentUser: false,
    },
];

export default function Chat() {
    return (
        <div className="flex flex-col min-h-[600px] w-full mx-auto border rounded bg-white">
            {/* Header com botão retração */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-semibold text-base">Chat</span>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Retrair/Expandir"
                >
                    <ChevronsRight />
                </Button>
            </div>
            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-6">
                    {mockMessages.map((msg) => (
                        <div key={msg.id}>
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://i.pravatar.cc/40?img=1" alt={msg.user} />
                                    <AvatarFallback>{msg.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 flex">
                                    <div
                                        className="bg-slate-900 text-white rounded-lg px-5 py-3 text-sm whitespace-pre-line break-words w-auto max-w-[80vw] md:max-w-[480px]"
                                        style={{ display: "inline-block" }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6 mt-2 px-11">
                                <span className="text-xs text-slate-700 font-medium">
                                    {msg.user}
                                </span>
                                <span className="text-xs text-slate-500">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
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