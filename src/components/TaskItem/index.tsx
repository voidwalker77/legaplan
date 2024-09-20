import styles from './styles.module.scss'
import { FiTrash } from 'react-icons/fi'

interface TaskItemProps {
    task: { id: number; title: string; completed: boolean }
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div
            className={styles.taskItem}
            onClick={() => onToggle(task.id)}
            role="button"
            tabIndex={0}
        >
            <div className={styles.container}>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        className={styles.checkbox}
                    />
                    <span className={styles.checkmark}></span>
                </label>

                <span
                    className={`${styles.taskTitle} ${
                        task.completed ? styles.completed : ''
                    }`}
                >
                    {task.title}
                </span>
            </div>

            <FiTrash
                className={styles.deleteIcon}
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(task.id)
                }}
            />
        </div>
    )
}

export default TaskItem
