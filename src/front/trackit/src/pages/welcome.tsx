import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Welcome() {
    return (
        <main className="flex flex-col items-start justify-start p-4 gap-[2rem]">
            <header className="">
                <h1 className="title-h1">Olá, <span className="text-sky-700">usuário!</span></h1>
                <h1 className="title-h1">Bem-vindo ao TrackIT — sua central de suporte técnico.</h1>
            </header>
            <div>
                <label className="title-h2 text-slate-700">Aqui você pode:</label>
                <ul className="title-h2 list-disc ml-6 text-slate-700">
                    <li>Abrir novos chamados para suporte técnico.</li>
                    <li>Acompanhar o andamento de solicitações.</li>
                    <li>Gerenciar suas configurações de conta.</li>
                </ul>
            </div>
            <footer className="flex flex-col gap-[1.5rem]">
                <div>
                    <h2 className="title-h2 text-slate-700">Comece abrindo seu primeiro chamado ou explore o menu ao lado!</h2>
                </div>
                <div >
                    <Link to="/user/open-ticket"><Button className="button-other p-0.75 1.5 w-[11.25rem] max-w-[11.25rem]">Abrir Chamado</Button></Link>
                </div>
            </footer>

        </main>
    )
}