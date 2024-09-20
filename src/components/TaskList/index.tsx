import TaskItem from '../TaskItem'
import styles from './styles.module.scss'

interface TaskListProps {
    tasks: { id: number, title: string, completed: boolean }[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    title: string
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, title }) => {
    return (
        <div>
            <div className={styles.mainCardTitle}>{title}</div>
            <div className={styles.mainCardBody}>
                <div className={styles.tasks}>
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskList
