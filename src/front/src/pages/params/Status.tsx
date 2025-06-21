import { StatusParams } from "@/components/params/StatusParams";

export function DetailsStatus() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="title-h1 text-slate-950 dark:text-white">Status</h1>
      <StatusParams />
    </div>
  );
}