import * as React from "react";
import { buttonVariants } from "./button-variants";
import { cn } from "@/lib/utils";

type UploadButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
    children?: React.ReactNode;
    className?: string;
};

export const UploadButton = React.forwardRef<HTMLInputElement, UploadButtonProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <label
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "cursor-pointer flex items-center gap-2",
                    className
                )}
            >
                {children}
                <input
                    type="file"
                    ref={ref}
                    className="hidden"
                    {...props}
                />
            </label>
        );
    }
);

UploadButton.displayName = "UploadButton";
