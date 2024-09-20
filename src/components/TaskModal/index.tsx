import styles from './styles.module.scss'
import Button from 'components/Button'

interface TaskModalProps {
    isOpen: boolean
    title: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onAdd: () => void
    onClose: () => void
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    title,
    value,
    onChange,
    onAdd,
    onClose,
}) => {
    if (!isOpen) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{title}</h2>
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
                        color='#000'
                    />
                    <Button title="Adicionar" onClick={onAdd} width="185px" />
                </div>
            </div>
        </div>
    )
}

export default TaskModal
