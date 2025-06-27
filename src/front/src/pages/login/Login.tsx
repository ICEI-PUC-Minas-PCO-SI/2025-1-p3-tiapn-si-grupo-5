import Logo from "../../assets/TrackIt_Logo.svg";
import Suport from "../../assets/Suporte_solucao.svg";
import { Link } from "react-router";
import { LoginUser } from "@/components/login/LoginUser";
import { Toaster } from "sonner";
import { useState } from "react";
import { DefaultSpinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Presentation } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Login() {
    const [loading, setLoading] = useState(false);
    if (loading) {
        return <DefaultSpinner />;
    }
    return (
        <>
            <div className="flex w-full min-h-screen">
                <div className="hidden lg:flex min-h-screen w-full p-9 flex-col justify-center items-center gap-1 bg-slate-100 dark:bg-slate-900">
                    <div>
                        <img
                            className="w-auto h-auto"
                            src={Suport}
                            alt="Transformando suporte em solução"
                        />
                    </div>
                    <h1 className="font-'[Inter]' text-[2rem] font-bold leading-[48px] text-slate-950 dark:text-white">
                        Transformando <span className="text-cyan-800  dark:text-cyan-500">suporte </span>
                        em <span className="text-cyan-800  dark:text-cyan-500">solução</span>
                    </h1>
                </div>
                <div className="flex flex-col w-full min-h-screen p-4 lg:p-9 items-start justify-center lg:justify-start gap-8 lg:gap-[4rem]">
                    <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <div className="flex items-center justify-between w-full">
                            <img className="w-20 lg:w-24 h-16 lg:h-20" src={Logo} alt="Logo Track It" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="icon"
                                            className="flex-shrink-0"
                                        >
                                            <Link to="/presentation" aria-label="Ver apresentação">
                                                <Presentation className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Ver apresentação
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="self-stretch inline-flex flex-col justify-start items-center gap-1">
                            <h2 className="title-h2 text-slate-800 dark:text-slate-200 text-center lg:text-left">Bem-vindo ao TrackIT</h2>
                            <h1 className="title-h1 text-slate-950 dark:text-white text-center lg:text-left">
                                Entre com suas credenciais
                            </h1>
                        </div>
                    </div>
                    <LoginUser loading={loading} setLoading={setLoading} />
                    <footer className="flex flex-col w-full h-full items-end justify-start gap-4 px-4 lg:px-[3rem] mt-0 lg:mt-[-2.5rem]">
                        <Link
                            to="forgot-password"
                            className=" !text-slate-950 hover:!text-sky-700 !underline decoration-solid paragraph-base dark:!text-white dark:hover:!text-sky-500"
                        >
                            Esqueceu a senha?
                        </Link>
                        <div className="w-full border-1 border-slate-500"></div>
                        <div className="w-full flex justify-center items-center">
                            <div className="flex flex-row items-center gap-x-1">
                                <span className="paragraph-base text-slate-950 dark:text-white">
                                    Não tem conta?
                                </span>
                                <Link
                                    to="register"
                                    className="paragraph-base !text-sky-500 !underline hover:!text-sky-700 dark:!text-sky-400
                                    dark:hover:!text-sky-500"
                                >
                                    Cadastre-se
                                </Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <Toaster position="bottom-right"
                richColors closeButton
                toastOptions={{
                    style: {
                        fontSize: '1rem',
                        padding: '1.25rem 1.5rem',
                        maxWidth: '400px',
                    },
                }}
            />
        </>
    );
}
