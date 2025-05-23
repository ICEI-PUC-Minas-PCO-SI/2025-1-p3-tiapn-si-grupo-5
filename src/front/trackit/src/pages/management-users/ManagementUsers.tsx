import { Button } from "@/components/ui/button";

export function ManagementUsers() {
    return (
        <div className="">
            <h1 className="title-h1 d-block">Gerenciar Usuários</h1>
            <div className="">
                {/*TODO: Barra de pesquisa */}
                <div className="flex w-[18rem] gap-6">
                    <Button size={"sm"} variant={"outline"}>Filtrar</Button>
                    <Button size={"sm"} variant={"outline"}>Pesquisar</Button>
                </div>
            </div>
        </div>
    );
}