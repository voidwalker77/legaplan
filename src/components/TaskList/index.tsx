import { TaskListProps } from 'interfaces/components/taskList'
import TaskItem from '../TaskItem'
import styles from './styles.module.scss'



const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggle,
    onDelete,
    title,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.mainCardTitle}>{title}</div>
            <div className={styles.mainCardBody}>
                <div className={styles.tasks}>
                    {tasks.length === 0 ? (
                        <p className={styles.noTasksMessage}>
                            {title === 'Suas tarefas de hoje'
                                ? 'Nenhuma tarefa para fazer.'
                                : 'Nenhuma tarefa finalizada.'}
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskList
