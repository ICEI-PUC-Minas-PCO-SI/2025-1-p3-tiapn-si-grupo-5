import { PriorityParams } from "@/components/params/PriorityParams";

export function Priority() {
    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-full overflow-hidden px-2 md:px-0">
            <h1 className="title-h1 text-slate-950 dark:text-white">Prioridades</h1>
            <PriorityParams />
        </div>
    );
}