import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { VscKey } from "react-icons/vsc";

import { useState } from 'react'


export function ForgotPassword() {
    const [isShow, setIsShow] = useState(false);

    const handlePassword = () => setIsShow(!isShow);

    return (

        <main>

            {/* Trocar hidden por flex, precisa criar dinamica para trocar parametros! */}
            <div className="hidden flex-col justify-center items-center mt-[7.25rem] ">
                <div className="w-[37.5rem] flex flex-col justify-center items-center gap-[2rem] ">

                    <VscKey className="w-[5rem] h-[5rem] text-cyan-800 -scale-x-100 rotate-45" />
                    <h1 className="text-[2rem] text-slate-950 font-bold leading-[3rem] font-'[Inter]'">Esqueceu a senha?</h1>
                    <p className="w-[35rem] font-'[Inter] text-[1.25rem] font-[500] leading-[2rem] text-slate-700">Não se preocupe. Vamos encaminhar as instruções de troca de senha através do seu e-mail cadastrado.</p>
                    <div className="w-[100%]">
                        <label className="label-layout">
                            E-mail:
                        </label>
                        <Input className="input-layout" type="email" placeholder="Email" />
                    </div>
                    <Button className="btn-layout">
                        Enviar verificação
                    </Button>

                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-[7.25rem]">
                <div className="w-[37.5rem] flex flex-col justify-center items-center gap-[2rem] ">

                    <VscKey className="w-[5rem] h-[5rem] text-cyan-800 -scale-x-100 rotate-45" />
                    <h1 className="text-[2rem] text-slate-950 font-bold leading-[3rem] font-'[Inter]'">Esqueceu a senha?</h1>
                    <p className="w-[35rem] font-'[Inter] text-[1.25rem] font-[500] leading-[2rem] text-slate-700">Não se preocupe. Vamos encaminhar as instruções de troca de senha através do seu e-mail cadastrado.</p>

                    <div className="w-full">
                        <label className="label-layout">
                            Código de Verificação:
                        </label>
                        <Input className="input-layout
                        appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]
                        " type="number" placeholder="Digite seu código de verificação" />
                    </div>

                    <div className="w-full">
                        <label className="label-layout">
                            Nova senha:
                        </label>
                        <div className="relative w-full">
                            <Input className="input-layout pr-10" type={isShow ? "text" : "password"} placeholder="Digite sua nova senha" />
                            <button onClick={handlePassword} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 focus: outline-0" >
                                {!isShow && <IoEyeOutline size={24} />}
                                {isShow && <IoEyeOffOutline size={24} />}
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="label-layout">
                            Confirmar senha:
                        </label>
                        <div className="relative w-full">
                            <Input className="input-layout pr-10" type={isShow ? "text" : "password"} placeholder="Digite novamente a senha" />
                            <button onClick={handlePassword} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 focus: outline-0" >
                                {!isShow && <IoEyeOutline size={24} />}
                                {isShow && <IoEyeOffOutline size={24} />}
                            </button>
                        </div>
                    </div>

                    <Button className="btn-layout">
                        Trocar senha
                    </Button>

                </div>
            </div>

        </main>

    );
}