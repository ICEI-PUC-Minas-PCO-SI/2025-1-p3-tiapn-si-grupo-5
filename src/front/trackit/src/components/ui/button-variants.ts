import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-sky-700 w-full h-[3rem] rounded-[6px] cursor-pointer hover:bg-sky-600 hover:shadow-[0px_2px_8px_0px] hover:shadow-slate-800 transition-all duration-200 text-[1rem] text-slate-100 font-medium font-[Poppins] text-[16px] font-semibold",
        outline:
          "bg-transparent w-full h-[3rem] rounded-[6px] cursor-pointer hover:shadow-md hover:shadow-slate-200 transition-all duration-300 ease-in-out text-[1rem] text-slate-700 font-[Poppins] text-[16px] font-semibold",
        secondary:
          "bg-slate-100 w-full h-[3rem] rounded-[6px] cursor-pointer hover:bg-slate-200 hover:shadow-[0px_2px_8px_0px] hover:shadow-slate-800 transition-all duration-200 text-[1rem] text-slate-700 font-[Poppins] text-[16px] font-semibold",
        disabled:
          "bg-sky-700 w-full h-[3rem] rounded-[6px] cursor-not-allowed text-[1rem] text-slate-100 font-[Poppins] text-[16px] font-semibold opacity-50",
        delete:
          "bg-red-600 w-full h-[3rem] rounded-[6px] cursor-pointer hover:bg-red-700 hover:shadow-[0px_2px_8px_0px] hover:shadow-red-800 transition-all duration-200 text-[1rem] text-white font-[Poppins] text-[16px] font-semibold",
      },
      size: {
        default: "",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
