import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useUser } from "@/contexts/UserContext";

export function Welcome() {
    const { user } = useUser();

    let userRole: "gestor" | "analista" | "usuario" = "usuario";
    if (user) {
        if (user.tipo === 1) userRole = "gestor";
        else if (user.tipo === 2) userRole = "analista";
        else if (user.tipo === 3) userRole = "usuario";
    }

    return (
        <main className="flex flex-col items-start justify-start p-4 gap-[2rem]">
            <header className="">
                <h1 className="title-h2">
                    Olá,{" "}
                    <span className="text-sky-700">
                        {user?.nome || userRole}
                    </span>!
                </h1>
                <h1 className="title-h3">Bem-vindo ao TrackIT —
                    {userRole === "usuario" && (
                        <> sua central de suporte técnico.</>
                    )}
                    {userRole === "analista" && (
                        <> sua central de atendimento técnico.</>
                    )}
                    {userRole === "gestor" && (
                        <> sua central de controle e desempenho da equipe.</>
                    )}
                </h1>
            </header>
            <div>
                <label className="title-h3 text-slate-700">Aqui você pode:</label>
                <ul className="title-h3 list-disc ml-6 text-slate-700">
                    {userRole === "usuario" && (
                        <>
                            <li>Abrir novos chamados para suporte técnico.</li>
                            <li>Acompanhar o andamento de solicitações.</li>
                            <li>Gerenciar suas configurações de conta.</li>
                        </>
                    )}
                    {userRole === "analista" && (
                        <>
                            <li>Visualizar chamados abertos para atendimento.</li>
                            <li>Gerenciar seus chamados em andamento.</li>
                            <li>Acompanhar seu desempenho nas demandas.</li>
                            <li>Atualizar seu perfil e configurações de conta.</li>
                        </>
                    )}
                    {userRole === "gestor" && (
                        <>
                            <li>Acompanhar todas as demandas registradas no sistema.</li>
                            <li>Monitorar o desempenho individual de cada analista.</li>
                            <li>Gerenciar usuarios e parâmetros do sistema.</li>
                            <li>Tomar decisões baseadas em dados e indicadores operacionais.</li>
                        </>
                    )}
                </ul>
            </div>
            <footer className="flex flex-col gap-[1.5rem]">
                <div>
                    <h2 className="title-h3 text-slate-700">
                        {userRole === "usuario" && (
                            <>
                                Comece abrindo seu primeiro chamado ou explore o menu ao lado!
                            </>
                        )}
                        {userRole === "analista" && (
                            <>
                                Comece visualizando os chamados em aberto!
                            </>
                        )}
                        {userRole === "gestor" && (
                            <>
                                Comece visualizando o dashbord!
                            </>
                        )}
                    </h2>
                </div>
                <div >
                    {userRole === "usuario" && (
                        <Link to="/user/open-ticket">
                            <Button className="button-other p-0.75 1.5 w-[11.25rem] max-w-[11.25rem]">
                                Abrir Chamado
                            </Button>
                        </Link>
                    )}
                    {userRole === "analista" && (
                        <Link to="/analyst/assign-tickets">
                            <Button className="button-other p-0.75 1.5 w-[14rem] max-w-[14rem]">
                                Ver Chamados
                            </Button>
                        </Link>
                    )}
                    {userRole === "gestor" && (
                        <Link to="/admin/performance">
                            <Button className="button-other p-0.75 1.5 w-[14rem] max-w-[14rem]">
                                Ver dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </footer>

        </main>
    )
}