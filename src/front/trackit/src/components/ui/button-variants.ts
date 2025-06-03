import { cva } from "class-variance-authority";
import "../../styles/index.css";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive button-base",
  {
    variants: {
      variant: {
        default:
          "bg-sky-700 text-slate-100 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-sky-600 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-slate-800 transition-all duration-200",
        outline:
          "bg-transparent text-slate-700 min-w-[7.75rem] h-[3rem] rounded-[6px] border border-slate-300 cursor-pointer hover:shadow-md hover:shadow-slate-200 transition-all duration-300 ease-in-out",
        outlineDisabled:
          "bg-transparent text-slate-400 min-w-[7.75rem] h-[3rem] rounded-[6px] border border-slate-200 cursor-not-allowed opacity-60",
        secondary:
          "bg-slate-100 text-slate-700 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-slate-200 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-slate-800 transition-all duration-200",
        disabled:
          "bg-sky-700 text-slate-100 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-not-allowed opacity-50",
        delete:
          "bg-red-600 text-white min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-red-500 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-red-700 transition-all duration-200",
        active:
          "bg-green-600 text-white min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-green-500 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-green-700 transition-all duration-200",
        ghost:
          "bg-transparent text-slate-700 min-w-[7.75rem] h-[3rem] rounded-[6px] cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aux-1",
      },
      size: {
        default: "min-w-[7.75rem] h-[3rem]",
        sm: "h-[2.5rem] min-w-[7.75rem]",
        icon: "min-w-[4.5rem] h-[3rem]",
        fit: "w-[10rem] h-[3rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
