import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function OpenTicket() {
    return (
        <div className="flex flex-col gap-[2rem]">
            <header className="max-w-[51.4rem]">
                <h1 className="title-h1">Preencha o chamado com as informações solicitadas</h1>
            </header>
            <main>
                <form className="flex flex-col gap-[2rem] max-w-[51.3rem]">
                    <div>
                        <label>Assunto da demanda</label>
                        <Input
                            type="text"
                            placeholder="Digite o assunto da demanda"
                        />
                    </div>
                    <div>
                        <label>Prioridade da demanda</label>
                        <Input
                            type="text"
                            placeholder="Digite o prioridade da demanda"
                        />
                    </div>
                    <div>
                        <label>Tipo da demanda</label>
                        <Input
                            type="text"
                            placeholder="Digite o tipo da demanda"
                        />
                    </div>
                    <div>
                        <label>Descrição da demanda</label>
                        <Textarea 
                            placeholder="Digite a descrição da demanda"
                            style={{ resize: "none" }}
                        />
                    </div>
                    {/* Anexar arquivo a ser implementado */}
                </form>
            </main>
            <footer className="flex justify-start gap-[4rem]">
                <Button className="button-other w-[11.25rem] max-w-[11.25rem]">
                    Abrir chamado
                </Button>
                <Button className="text-slate-950 w-[11.25rem] max-w-[11.25rem] 
                shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] hover:text-slate-700 hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.30)] transition-all duration-200" variant={"outline"}>
                    Cancelar
                </Button>
            </footer>
        </div>
    );
}