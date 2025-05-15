import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { VscKey } from "react-icons/vsc";
import { Link } from "react-router";

export function ForgotPassword() {

    return (

        <main className="flex flex-col justify-center items-center pt-[7.25rem]">

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
                        <Link to="/resetPassword">
                            Enviar verificação
                        </Link>
                    </Button>

                </div>

        </main>

    );
}