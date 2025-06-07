import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  if (type === "color") {
    return (
      <div className="relative flex items-center">
        <div
          className={cn(
            "w-10 h-10 rounded-[6px] border border-slate-300 bg-white flex items-center justify-center shadow transition-all",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "focus-within:aria-invalid:ring-destructive/20 focus-within:dark:aria-invalid:ring-destructive/40 focus-within:aria-invalid:border-destructive"
          )}
        >
          <input
            type="color"
            data-slot="input"
            className={cn(
              "rounded-[8px] p-1.25 bg-transparent cursor-pointer",
              className
            )}
            style={{
              display: "block",
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[2.5rem] p-[0.75rem] rounded-[6px] border border-slate-300",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
