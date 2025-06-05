import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusParams } from "../../components/params/StatusParams";

export function DetailsStatus() {
  const [isAdding, setIsAdding] = useState(false); // Estado para controlar o modo de adição

  return (
    <div className="flex flex-col gap-6">
      <h1 className="title-h1 text-slate-950">Gerenciar Paramêtros</h1>
      <div className="border-2 p-4 rounded mb-6">
        <div className="flex justify-between">
          <h2 className="title-h2 text-slate-700">
            Editar status
          </h2>
          <Button className="w-38 mr-6"
            onClick={() => setIsAdding(true)} // Controla o estado de adição
          >
            + Adicionar
          </Button>
        </div>
        {/* Passa o estado e a função para o componente StatusParams */}
        <StatusParams isAdding={isAdding} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
}