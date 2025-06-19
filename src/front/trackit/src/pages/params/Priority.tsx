import { PriorityParams } from "@/components/params/PriorityParams";

export function Priority() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="title-h1 text-slate-950 dark:text-white">Prioridades</h1>
                <PriorityParams />
        </div>
    );
}