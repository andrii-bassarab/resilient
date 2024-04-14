import React from "react";
import { twMerge } from "tailwind-merge";

interface IBox extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "all" | "vertical" | "horizontal" | "none";
  fullWidth?: boolean;
}

export const Box = ({
  className,
  padding = "all",
  fullWidth = true,
  ...props
}: IBox) => {
  const paddingVariants: Record<typeof padding, string> = {
    all: "p-6",
    vertical: "py-6",
    horizontal: "px-6",
    none: "",
  };

  return (
    <div
      className={twMerge(
        "flex flex-col gap-6 items-stretch",
        paddingVariants[padding],
        fullWidth ? "w-full" : "w-max",
        className
      )}
      {...props}
    />
  );
};
