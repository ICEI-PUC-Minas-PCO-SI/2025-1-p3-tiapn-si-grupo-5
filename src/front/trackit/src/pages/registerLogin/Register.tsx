// Images
import Logo from '../../assets/TrackIt_Logo.svg'
import Suport from '../../assets/Support_Register.svg'

// Components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Link
import { Link } from 'react-router'

// Icons
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from 'react'


export function Register() {
    const [isShow, setIsShow] = useState(false);
        
    const handlePassword = () => setIsShow(!isShow);

    return (
        <div className="grid grid-cols-2 gap-[2.25rem]">
            <div className="">
                <header>
                    <div className="mt-[2.25rem] ml-[2.25rem]">
                        <img className="w-28 h-24" src={Logo} alt="Logo Track It" />
                    </div>
                </header>
                <main>
                    <div className="display: flex flex-col items-center mt-[1.125rem] mb-[1.125rem] gap-[0.75rem]">
                        <h2
                            className="justify-start text-slate-800 text-[1.5rem] font-semibold leading-loose font-'[Inter]'">
                            Bem-vindo ao TrackIT
                        </h2>
                        <h1
                            className="justify-start text-[2rem] text-slate-950 font-bold leading-[3rem] font-'[Inter]'">
                            Cadastre com suas credenciais
                        </h1>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <div className="w-[37.5rem] flex flex-col justify-center items-center gap-[1rem]">
                            
                            <div className="w-[100%]">
                                <label className="label-layout">
                                    Nome:
                                </label>
                                <Input className="input-layout" type="text" placeholder="Digite seu nome completo" />
                            </div>
                            
                            <div className="w-[100%]">
                                <label className="label-layout">
                                    Matrícula:
                                </label>
                                <Input className="input-layout" type="text" placeholder="Digite sua matrícula (BM)" />
                            </div>

                            <div className="w-[100%]">
                                <label className="label-layout">
                                    Ramal:
                                </label>
                                <Input className="input-layout" type="tel" placeholder="Ramal" />
                            </div>

                            <div className="w-[100%]">
                                <label className="label-layout">
                                    Gerência:
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full input-layout">
                                        <SelectValue placeholder="Selecione sua gerência" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Gerências</SelectLabel>
                                        <SelectItem value="dcap">Diretoria Central de Administração de Pessoa (DCAP)</SelectItem>
                                        <SelectItem value="gecea">Gerência de Central de Atendimento (GECEA)</SelectItem>
                                        <SelectItem value="gesfo">Gerência de Gestão da Folha de Pagamento (GESFO)</SelectItem>
                                        <SelectItem value="geted">Gerência de Gestão de Direitos e Benefícios (GETED)</SelectItem>
                                        <SelectItem value="gevif">Gerência de Gestão de Ingresso e da Vida Funcional (GEVIF)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

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
                                    Cadastre-se
                                </Button>
                            </div>

                        </div>
                    </div>


                </main>
                <footer>
                    <div className="w-full flex justify-center mt-[1.5rem]">
                        <div className="w-[37.5rem] flex flex-col justify-end items-end gap-[1.5rem]">

                            <div className="w-full border-1 border-slate-500"></div>

                            <div className="w-full flex justify-center items-center">
                                <h3 className="font-'[Inter]' text-[1rem] font-normal leading-[24px] text-slate-950">
                                Não tem conta? {' '}
                                <Link to="../"
                                className="!font-'[Inter]' !text-sky-500 !underline hover:!text-sky-700">
                                    Fazer login
                                </Link>
                                </h3>
                            </div>
                            
                        </div>
                    </div>

                </footer>
            </div>

            <aside className="h-screen flex flex-col justify-center items-center bg-slate-100">
                <div>
                    <img src={Suport} alt="Transformando suporte em solução" />
                </div>
                <h1 className="font-'[Inter]' text-[2rem] font-bold leading-[48px] text-slate-950 mt-[4rem]">
                    Transformando{' '}
                    <span className="text-cyan-800">suporte </span>
                    em{' '}
                    <span className="text-cyan-800">solução</span>
                </h1>
            </aside>
        </div>
    )
}