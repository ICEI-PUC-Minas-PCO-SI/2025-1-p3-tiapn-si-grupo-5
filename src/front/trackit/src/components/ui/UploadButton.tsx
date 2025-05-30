import * as React from "react";
import { buttonVariants } from "./button-variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type ButtonSize = "default" | "sm" | "icon" | "fit";
type UploadButtonProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
    VariantProps<typeof buttonVariants> & {
        children?: React.ReactNode;
        className?: string;
        size?: ButtonSize;
        variant?: "outlineDisabled" | "outline" | "default";
    };

export const UploadButton = React.forwardRef<HTMLInputElement, UploadButtonProps>(
    ({ children, className, size = "default", variant = "outline", ...props }, ref) => {
        return (
            <label
                className={cn(
                    buttonVariants({ variant, size }),
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
