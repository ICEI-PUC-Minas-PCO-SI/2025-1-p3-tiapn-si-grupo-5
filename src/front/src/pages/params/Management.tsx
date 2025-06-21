import { ManagementParams } from "@/components/params/ManagementParams";

export function DetailsManagement() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="title-h1 text-slate-950 dark:text-white">Gerências</h1>
      <ManagementParams />
    </div>
  );
}