import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
}

const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    ghost: "bg-transparent text-blue-500 border border-blue-500",
};

export const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`px-3 py-2 rounded-md disabled:opacity-50 ${variantClasses[variant]} ${props.className}`}
        >
            {children}
        </button>
    );
};
