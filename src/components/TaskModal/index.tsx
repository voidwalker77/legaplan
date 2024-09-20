import styles from './styles.module.scss'
import Button from 'components/Button'

interface TaskModalProps {
    isOpen: boolean
    type: 'create' | 'delete'
    title: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onConfirm: () => void
    onClose: () => void
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    type,
    title,
    value = '',
    onChange,
    onConfirm,
    onClose,
}) => {
    if (!isOpen) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{title}</h2>

                {type === 'create' && (
                    <div className={styles.container}>
                        <div className={styles.labelContainer}>
                            Título
                            <input
                                type="text"
                                value={value}
                                onChange={onChange}
                                placeholder="Digite"
                                className={styles.modalInput}
                            />
                        </div>
                        <div className={styles.modalButtons}>
                            <Button
                                title="Cancelar"
                                onClick={onClose}
                                width="185px"
                                backgroundColor="#E7EEFB"
                                color="#000"
                            />
                            <Button
                                title="Adicionar"
                                onClick={onConfirm}
                                width="185px"
                            />
                        </div>
                    </div>
                )}

                {type === 'delete' && (
                    <div className={styles.container}>
                        <p className={styles.confirmText}>
                            Tem certeza que deseja excluir esta tarefa?
                        </p>
                        <div className={styles.modalButtons}>
                            <Button
                                title="Cancelar"
                                onClick={onClose}
                                width="185px"
                                backgroundColor="#E7EEFB"
                                color="#000"
                            />
                            <Button
                                title="Deletar"
                                onClick={onConfirm}
                                width="185px"
                                backgroundColor="linear-gradient(90deg, #D30707, #F05353)"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskModal
