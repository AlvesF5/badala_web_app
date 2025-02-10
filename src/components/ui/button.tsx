import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const buttonClass = classNames(
    "px-4 py-2 rounded text-white font-bold",
    {
      "bg-blue-500 hover:bg-blue-600": variant === "primary",
      "bg-gray-500 hover:bg-gray-600": variant === "secondary",
    },
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};