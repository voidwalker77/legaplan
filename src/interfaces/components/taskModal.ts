export interface TaskModalProps {
    isOpen: boolean
    type: 'create' | 'delete'
    title: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onConfirm: () => void
    onClose: () => void
    errorMessage?: string
}
