import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface LoginDataProps { }

export function LoginData(props: LoginDataProps) {
    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

    <form className="flex flex-col gap-3 justify-center">
        <Input name="E-mail" placeholder="Digite seu e-mail"></Input>
        <div className="relative w-full">
            <Input
                className="pr-10"
                type={isShow ? "text" : "password"}
                placeholder="Senha"
            />
            <button
                type="button"
                onClick={handlePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isShow ? "Ocultar senha" : "Mostrar senha"}
            >
                {isShow ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
            </button>
        </div>
        <Button className="btn-layout">
            Login
        </Button>
    </form>;
}
