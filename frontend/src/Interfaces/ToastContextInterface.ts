export interface ToastContextInterface {
    addToast: (message: string, error: boolean, time: Date) => void,
    removeToast: (id: number) => void
}