import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export function Searchbar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log(value);
  };

  return (
    <div className="relative w-full max-w-[41rem]">
      <Input
        type="text"
        placeholder="Pesquise pelo nome ou palavra chave"
        value={searchValue}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-2 w-full"
      />
      <MagnifyingGlassIcon
        size={20}
        weight="bold"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}
