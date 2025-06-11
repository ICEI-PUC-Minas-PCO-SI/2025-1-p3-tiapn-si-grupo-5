import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MessageProps {
    user: string;
    time: string;
    text: string;
    isCurrentUser: boolean;
    avatarImg?: string;
}

export function Message({ user, time, text, isCurrentUser, avatarImg }: MessageProps) {
    return (
        <div className={`flex flex-col gap-1 ${isCurrentUser ? "items-end" : "items-start"}`}>
            <div className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={avatarImg || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} alt={user} />
                    <AvatarFallback>{user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex" style={isCurrentUser ? { justifyContent: "flex-end" } : {}}>
                    <div
                        className={`rounded-lg px-5 py-3 text-sm whitespace-pre-line break-words w-auto max-w-[80vw] md:max-w-[480px] ${isCurrentUser
                            ? "bg-sky-700 text-white"
                            : "bg-slate-900 text-white"
                            }`}
                        style={{ display: "inline-block" }}
                    >
                        {text}
                    </div>
                </div>
            </div>
            <div
                className={`flex gap-2 px-11 text-xs ${isCurrentUser ? "justify-end text-right" : "justify-start text-left"
                    }`}
            >
                <span className="text-slate-700 font-medium">{user}</span>
                <span className="text-slate-500">{time}</span>
            </div>
        </div>
    );
}
