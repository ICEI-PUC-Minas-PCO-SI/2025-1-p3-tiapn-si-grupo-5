import Suport from '../../assets/Support_Register.svg'
import { Link } from 'react-router'
import { RegisterUser } from '@/components/register/RegisterUser'
import { Toaster } from 'sonner'

export function Register() {

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
                        Transformando <span className="text-cyan-800 dark:text-cyan-500">suporte </span>
                        em <span className="text-cyan-800 dark:text-cyan-500">solução</span>
                    </h1>
                </div>
                <div className="flex flex-col w-full h-full p-4 lg:p-9 items-start justify-center lg:justify-start gap-4 lg:gap-[1.125rem]">
                    <div className="flex flex-col w-full h-full self-stretch justify-start items-center gap-1">
                        <h1 className="title-h1 text-slate-950 dark:text-white text-center lg:text-left">
                            Cadastre suas credenciais
                        </h1>
                    </div>
                    <RegisterUser />
                    <footer className="flex flex-col w-full h-full items-end justify-start gap-4 px-4 lg:px-[3rem]">
                        <div className="w-full border-1 border-slate-500 dark:border-slate-400"></div>
                        <div className="w-full flex justify-center items-center">
                            <div className="flex flex-row items-center gap-x-1">
                                <span className="paragraph-base text-slate-950 dark:text-white">
                                    Já tem conta?
                                </span>
                                <Link
                                    to="../"
                                    className="paragraph-base !text-sky-500 !underline hover:!text-sky-700 dark:!text-sky-400
                                    dark:hover:!text-sky-500"
                                >
                                    Fazer login
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
    )
}