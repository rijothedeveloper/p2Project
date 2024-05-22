import { ReactNode, useCallback, useState } from "react";
import { ToastMessageInterface } from "../Interfaces/ToastMessageInterface";
import { ToastContext } from "./ToastContext";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [toasts, setToasts] = useState<ToastMessageInterface[]>([]);
    let nextId = 0;

    const addToast = useCallback((message: string, error: boolean, time: Date) => {
        const newToast: ToastMessageInterface = {id: nextId++, error, message, time};
        setToasts([...toasts, newToast]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div aria-live="polite" aria-atomic="true" className="position-relative">
                <ToastContainer position="bottom-end" className="position-fixed p-3">
                    {toasts.map((toast) => {
                        const toastStyle = toast.error ? "bg-danger bg-opacity-75": "text-bg-success bg-opacity-75";
                        const toastHeader = toast.error ? "Failed!": "Success!";
                        const localTime = toast.time.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        });
                        return (
                            <Toast
                                key={toast.id}
                                className={toastStyle}
                                onClose={() => removeToast(toast.id)}
                                delay={20000}
                                autohide
                            >
                                <Toast.Header>
                                    <strong className="me-auto">{toastHeader}</strong>
                                    <small className="text-body-secondary">{localTime}</small>
                                </Toast.Header>
                                <Toast.Body>{toast.message}</Toast.Body>
                            </Toast>
                        )
                    })}
                </ToastContainer>
            </div>
        </ToastContext.Provider>
    )
};