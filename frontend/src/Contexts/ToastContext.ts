import { createContext, useContext } from "react";
import { ToastContextInterface } from "../Interfaces/ToastContextInterface";

export const ToastContext = createContext<ToastContextInterface|null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider!");
    }
    return context;
};