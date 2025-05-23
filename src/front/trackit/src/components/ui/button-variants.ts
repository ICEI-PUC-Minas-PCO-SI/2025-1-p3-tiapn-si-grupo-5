import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-sky-700 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-sky-600 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-slate-800 transition-all duration-200 text-[1rem] text-slate-100 font-medium font-[Poppins] text-[1rem] font-semibold",
        outline:
          "bg-transparent min-w-[7.75rem] h-[3rem] rounded-[0.375rem] border border-slate-700 cursor-pointer hover:shadow-md hover:shadow-slate-200 transition-all duration-300 ease-in-out text-[1rem] text-slate-700 font-[Poppins] text-[1rem] font-semibold",
        secondary:
          "bg-slate-100 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-slate-200 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-slate-800 transition-all duration-200 text-[1rem] text-slate-700 font-[Poppins] text-[1rem] font-semibold",
        disabled:
          "bg-sky-700 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-not-allowed text-[1rem] text-slate-100 font-[Poppins] text-[1rem] font-semibold opacity-50",
        delete:
          "bg-red-600 min-w-[7.75rem] h-[3rem] rounded-[0.375rem] cursor-pointer hover:bg-red-700 hover:shadow-[0px_0.125rem_0.5rem_0px] hover:shadow-red-800 transition-all duration-200 text-[1rem] text-white font-[Poppins] text-[1rem] font-semibold",
      },
      size: {
        default: "min-w-[7.75rem] h-[3rem]", // Default: 124px x 48px
        sm: "h-[2rem] min-w-[7.75rem]", // Small: 32px height
        icon: "min-w-[4.5rem] h-[3rem]", // Icon: 72px width
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
