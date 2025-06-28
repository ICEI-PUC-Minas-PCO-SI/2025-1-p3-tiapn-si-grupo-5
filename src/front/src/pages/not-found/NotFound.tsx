import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import Logo from "../../assets/TrackIt_Logo.svg";
import clsx from "clsx";

export function NotFound() {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleGoHome = () => {
        if (!user) {
            navigate("/");
            return;
        }

        // Redireciona para a home baseada no tipo de usuário
        if (user.tipo === 1 || user.idTipoUsuario === 1) {
            navigate("/admin");
        } else if (user.tipo === 2 || user.idTipoUsuario === 2) {
            navigate("/analyst");
        } else {
            navigate("/user");
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={clsx(
            "flex min-h-screen items-center justify-center px-4 py-6",
            "bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
        )}>
            <div className={clsx(
                "w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 md:p-8 rounded-lg shadow-lg",
                "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            )}>
                <div className="flex flex-col items-center gap-6 lg:w-1/2">
                    <div className="flex flex-col items-center gap-3">
                        <img className="w-16 h-12 md:w-20 md:h-16" src={Logo} alt="Logo Track It" />
                        <span className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-200">
                            Track<span className="text-cyan-800 dark:text-cyan-400">IT</span>
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-cyan-800 dark:text-cyan-400 select-none">
                        404
                    </h1>
                    <div className={clsx(
                        "w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center",
                        "bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                    )}>
                        <div className="text-2xl md:text-3xl lg:text-4xl">🔍</div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:w-1/2 lg:pl-8">
                    <div className="text-center lg:text-left space-y-3">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Página não encontrada
                        </h2>
                        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base lg:text-lg">
                            Ops! A página que você está procurando não existe ou foi movida para outro local.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                        <Button
                            onClick={handleGoHome}
                            className="flex items-center gap-2 min-w-[140px] bg-cyan-800 hover:bg-cyan-900 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleGoBack}
                            className={clsx(
                                "flex items-center gap-2 min-w-[140px]",
                                "text-slate-950 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] hover:text-slate-700",
                                "hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.30)] transition-all duration-200",
                                "dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                            )}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar
                        </Button>
                    </div>
                    <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center lg:text-left">
                        <p className="font-medium text-slate-600 dark:text-slate-300 mb-2">Algumas sugestões:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 text-left">
                            <div className="flex items-start gap-2">
                                <span className="text-cyan-800 dark:text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                                <span>Verifique se o endereço foi digitado corretamente</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-cyan-800 dark:text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                                <span>Use o menu de navegação para encontrar o que procura</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-cyan-800 dark:text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                                <span>Entre em contato com o suporte se o problema persistir</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs text-slate-400 dark:text-slate-500 text-center lg:text-left">
                            TrackIt - Sistema de Gestão de Chamados
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
