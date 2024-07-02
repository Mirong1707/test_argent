import React from "react";
import { Button } from "./Button";


export function DialogTrigger({ children, onClick, asChild = false }: { children: React.ReactNode; onClick: () => void; asChild?: boolean }) {
    if (asChild) {
        return React.cloneElement(children as React.ReactElement, { onClick });
    }
    return <Button onClick={onClick}>{children}</Button>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
    return <h1 className="font-semibold text-xl">{children}</h1>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
    return <div className="p-8 bg-white rounded-md flex flex-col gap-12">{children}</div>;
}

export default function Dialog({
                                   children,
                                   title,
                               }: { children: React.ReactNode; title?: string }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <DialogTrigger onClick={() => setIsOpen(true)}>{title}</DialogTrigger>
            {isOpen && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
                    <DialogContent>
                        <div className="flex flex-row justify-between w-full">
                            {title && <DialogHeader>{title}</DialogHeader>}
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            >
                                x
                            </button>
                        </div>
                        {children}
                    </DialogContent>
                </div>
            )}
        </div>
    );
}
