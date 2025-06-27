import { ManagementParams } from "@/components/params/ManagementParams";

export function DetailsManagement() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full max-w-full overflow-hidden px-2 md:px-0">
      <h1 className="title-h1 text-slate-950 dark:text-white">Gerências</h1>
      <ManagementParams />
    </div>
  );
}