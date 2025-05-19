import Suport from '../../assets/Support_Register.svg'
import { Link } from 'react-router'
import { RegisterUser } from '@/components/RegisterUser'


export function Register() {

    return (
        <div className="flex w-full min-h-screen">
            {/* Conteúdo - Login, etc.*/}
            <div className="flex flex-col w-full h-full p-9 items-start justify-start gap-[1.125rem]">
                <div className=" flex flex-col w-full h-full self-stretch justify-start items-center gap-1">
                    <h1 className="title-h1 text-slate-950">
                        Cadastre suas credenciais
                    </h1>
                </div>


                {/* Formulário de Cadastro*/}
                <RegisterUser />

                {/* /*<SelectItem value="">Diretoria Central de Administração de Pessoa (DCAP)</SelectItem>
                                    <SelectItem value="">Gerência de Central de Atendimento (GECEA)</SelectItem>*/}

                <footer className="flex flex-col w-full h-full items-end justify-start gap-4 px-[3rem]">
                    <div className="w-full border-1 border-slate-500"></div>
                    <div className="w-full flex justify-center items-center">
                        <div className="flex flex-row items-center gap-x-1">
                            <span className="paragraph-base text-slate-950">
                                Já tem conta?
                            </span>
                            <Link
                                to="../"
                                className="paragraph-base !text-sky-500 !underline hover:!text-sky-700"
                            >
                                Fazer login
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>

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
        </div>
    )
}