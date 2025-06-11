import { Badge } from "@/components/ui/badge"

export function Chat() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-4 items-center">
                <h1 className="title-h1 text-slate-950">
                    Assunto da demanda
                </h1>
                <Badge variant="outline" className="h-10">
                    #XXXXXXXXYY
                </Badge>
            </div>
            <div>
                <Badge className="h-10 bg-red-600 text-slate-950">
                    Prioridade
                </Badge>
            </div>
            </div>
        </div>
    )
}