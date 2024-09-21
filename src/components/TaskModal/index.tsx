import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Button from 'components/Button'
import { TaskModalProps } from 'interfaces/components/taskModal'

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    type,
    title,
    value = '',
    onChange,
    onConfirm,
    onClose,
    errorMessage,
}) => {
    const [buttonWidth, setButtonWidth] = useState('185px')

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setButtonWidth('100%')
            } else {
                setButtonWidth('185px')
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (!isOpen) return null

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {type === 'create' && (
                    <div className={styles.container}>
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
                        {errorMessage && (
                            <p className={styles.errorMessage}>
                                {errorMessage}
                            </p>
                        )}
                        <div
                            className={styles.modalButtons}
                            data-cy="addtask-modalbutton"
                        >
                            <Button
                                title="Cancelar"
                                onClick={onClose}
                                backgroundColor="#E7EEFB"
                                color="#000"
                                width={buttonWidth}
                            />
                            <Button
                                title="Adicionar"
                                onClick={onConfirm}
                                width={buttonWidth}
                            />
                        </div>
                    </div>
                )}

                {type === 'delete' && (
                    <div className={styles.container}>
                        <h2 className={styles.modalTitle}>{title}</h2>
                        <p className={styles.confirmText}>
                            Tem certeza que deseja excluir esta tarefa?
                        </p>
                        <div
                            className={styles.modalButtons}
                            data-cy="removeTask-modalbutton"
                        >
                            <Button
                                title="Cancelar"
                                onClick={onClose}
                                backgroundColor="#E7EEFB"
                                color="#000"
                                width={buttonWidth}
                            />
                            <Button
                                title="Deletar"
                                onClick={onConfirm}
                                backgroundColor="linear-gradient(90deg, #D30707, #F05353)"
                                width={buttonWidth}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskModal
