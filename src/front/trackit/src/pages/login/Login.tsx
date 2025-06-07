import Logo from "../../assets/TrackIt_Logo.svg";
import Suport from "../../assets/Suporte_solucao.svg";
import { Link } from "react-router";
import { LoginUser } from "@/components/login/LoginUser";
import { Toaster } from "sonner";

export function Login() {

    return (
        <>
            <div className="flex w-full min-h-screen">
                                <div className="flex min-h-screen w-full p-9 flex-col justify-center items-center gap-1 bg-slate-100">
                    <div>
                        <img
                            className="w-auto h-auto"
                            src={Suport}
                            alt="Transformando suporte em solução"
                        />
                    </div>
                    <h1 className="font-'[Inter]' text-[2rem] font-bold leading-[48px] text-slate-950">
                        Transformando <span className="text-cyan-800">suporte </span>
                        em <span className="text-cyan-800">solução</span>
                    </h1>
                </div>
                <div className="flex flex-col w-full min-h-screen p-9 items-start justify-start gap-[4rem]">
                    <div className="flex flex-col gap-4 items-start justify-start w-full h-full">
                        <img className="w-24 h-20" src={Logo} alt="Logo Track It" />
                        <div className="self-stretch inline-flex flex-col justify-start items-center gap-1">
                            <h2 className="title-h2 text-slate-800">Bem-vindo ao TrackIT</h2>
                            <h1 className="title-h1 text-slate-950">
                                Entre com suas credenciais
                            </h1>
                        </div>
                    </div>
                    <LoginUser />
                    <footer className="flex flex-col w-full h-full items-end justify-start gap-4 px-[3rem] mt-[-2.5rem]">
                        <Link
                            to="forgot-password"
                            className=" !text-slate-950 hover:!text-sky-700 !underline decoration-solid paragraph-base"
                        >
                            Esqueceu a senha?
                        </Link>
                        <div className="w-full border-1 border-slate-500"></div>
                        <div className="w-full flex justify-center items-center">
                            <div className="flex flex-row items-center gap-x-1">
                                <span className="paragraph-base text-slate-950">
                                    Não tem conta?
                                </span>
                                <Link
                                    to="register"
                                    className="paragraph-base !text-sky-500 !underline hover:!text-sky-700"
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
