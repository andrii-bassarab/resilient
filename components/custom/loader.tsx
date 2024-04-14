import React from "react";
import "./loader.css";
import { twMerge } from "tailwind-merge";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "w-full flex flex-row justify-center items-center mx-auto py-10",
        className
      )}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
