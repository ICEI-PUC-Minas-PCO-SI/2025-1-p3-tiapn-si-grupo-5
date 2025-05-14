import Logo from '../../assets/TrackIt_Logo.svg'
import Suport from '../../assets/Suporte_solucao.svg'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Link } from 'react-router'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

import { useState } from 'react'

export function Login() {
      {/*const [isShow, setIsShow] = useState(false);
    
  *const handlePassword = () => setIsShow(!isShow);*/}

    return (
        <div className="flex w-full h-screen">

            {/* Conteúdo - Login, etc.*/}
            <div className="flex w-full h-full p-9 items-start justify-start gap-16">

                {/* Logo + mensagem inicial*/}
                <div className='flex flex-col gap-4 items-start justify-start w-full h-full'>
                    <img className="w-24 h-20" src={Logo} alt="Logo Track It"/>
                    <div className='self-stretch inline-flex flex-col justify-start items-center gap-1'>
                        <h2 className="justify-start text-slate-800 text-[1.5rem] font-semibold leading-loose font-'[Inter]'">
                            Bem-vindo ao TrackIT
                        </h2>
                        <h1 className="justify-start text-[2rem] text-slate-950 font-bold leading-[3rem] font-'[Inter]'">
                            Entre com suas credenciais
                        </h1>
                    </div>
                </div>
                
                {/* Formulário de Login*/}

            </div>

            {/* Imagem */}
            <div className='flex w-full h-full p-9 items-start justify-start gap-16'>

            </div>
        </div>


/*         <div className="grid grid-cols-2 gap-[2.25rem]">
            <div className="">
                <header>
                    <div className="mt-[3.75rem] ml-[3.75rem]">
                        <img className="w-28 h-24" src={Logo} alt="Logo Track It" />
                    </div>
                </header>
                <main>
                    <div className="display: flex flex-col items-center mt-[4rem] mb-[4rem] gap-[0.75rem]">
                        <h2
                            className="justify-start text-slate-800 text-[1.5rem] font-semibold leading-loose font-'[Inter]'">
                            Bem-vindo ao TrackIT
                        </h2>
                        <h1
                            className="justify-start text-[2rem] text-slate-950 font-bold leading-[3rem] font-'[Inter]'">
                            Entre com suas credenciais
                        </h1>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <div className="w-[37.5rem] flex flex-col justify-center items-center gap-[1rem]">

                            <div className="w-[100%]">
                                <label className="label-layout">
                                    E-mail:
                                </label>
                                <Input className="input-layout" type="email" placeholder="Email" />
                            </div>

                            <div className="w-full">
                                <label className="label-layout">
                                    Senha:
                                </label>
                                <div className="relative w-full">
                                    
                                    <Input className="input-layout pr-10" type={isShow ? "text" : "password"} placeholder="Senha" />
                                    
                                    <button onClick={handlePassword} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 focus: outline-0" >
                                        {!isShow && <IoEyeOutline size={24}/>}
                                        {isShow && <IoEyeOffOutline size={24}/>}
                                    </button>
                                </div>
                            </div>

                            <div className="w-[100%]">
                                <Button className="btn-layout">
                                    Login
                                </Button>
                            </div>

                        </div>
                    </div>


                </main>
                <footer>
                    <div className="w-full flex justify-center mt-[1.5rem]">
                        <div className="w-[37.5rem] flex flex-col justify-end items-end gap-[1.5rem]">

                            <h3 className="font-'[Inter]' text-[1rem] font-normal leading-[24px] underline decoration-solid ">
                                <Link to="noPassword" className="!text-slate-950 hover:!text-sky-700">
                                    Esqueceu a senha?
                                </Link>
                            </h3>

                            <div className="w-full border-1 border-slate-500"></div>

                            <div className="w-full flex justify-center items-center">
                                <h3 className="font-'[Inter]' text-[1rem] font-normal leading-[24px] text-slate-950">
                                Não tem conta? {' '}
                                <Link to="register"
                                className="!font-'[Inter]' !text-sky-500 !underline hover:!text-sky-700">
                                    Cadastar-se
                                </Link>
                                </h3>
                            </div>
                            
                        </div>
                    </div>

                </footer>
            </div> */
    )
}