import React, { useState } from "react";
import { StatusParams } from "../../components/StatusParams";

export function DetailsStatus() {
  const [isAdding, setIsAdding] = useState(false); // Estado para controlar o modo de adição

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Parâmetros</h1>
      <div className="border-2 p-4 rounded mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <button
            onClick={() => setIsAdding(true)} // Controla o estado de adição
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            + Adicionar
          </button>
        </div>
        {/* Passa o estado e a função para o componente StatusParams */}
        <StatusParams isAdding={isAdding} setIsAdding={setIsAdding} />
      </div>
    </div>
  );
}