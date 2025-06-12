import { Button } from "../ui/button";
import { PaperclipHorizontalIcon } from "@phosphor-icons/react";

export function Anexar() {
    return (
        <Button type="button" variant={"annex"} className="max-w-[11.25rem]">
            <PaperclipHorizontalIcon size={24} weight="bold" className="text-slate-500 rotate-90 dark:text-slate-300" />
            <span className="text-slate-500 text-[14px] font-bold dark:text-slate-300">Anexar</span>
        </Button>
    )
}