import { useState } from 'react'
import Image from 'next/image'
import Logo from '../images/logo.svg'
import styles from './styles.module.scss'
import Button from 'components/Button'
import TaskList from '../components/TaskList'
import TaskModal from '../components/TaskModal'
import { Task } from 'interfaces/components/task'

export default function MainPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskTitle, setTaskTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setTaskTitle('')
    }

    const addTask = () => {
        if (taskTitle.trim() === '') return
        const newTask: Task = {
            id: Date.now(),
            title: taskTitle,
            completed: false,
        }
        setTasks([...tasks, newTask])
        closeModal()
    }

    const toggleTaskCompletion = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        )
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <main className={styles.wrapper}>
            <header className={styles.header}>
                <Image
                    src={Logo}
                    alt="logo do site"
                    height={100}
                    width={100}
                    className={styles.logo}
                />
                <h2 className={styles.headerTitle}>
                    Bem-vindo de volta, Marcus
                </h2>
                <p className={styles.headerPhrase}>
                    Segunda, 01 de dezembro de 2025
                </p>
            </header>

            <div className={styles.mainCard}>
                <TaskList
                    tasks={tasks.filter((task) => !task.completed)}
                    onToggle={toggleTaskCompletion}
                    onDelete={deleteTask}
                    title="Suas tarefas de hoje"
                />
                
                <TaskList
                    tasks={tasks.filter((task) => task.completed)}
                    onToggle={toggleTaskCompletion}
                    onDelete={deleteTask}
                    title="Tarefas finalizadas"
                />
            </div>
            <Button title="Adicionar nova tarefa" onClick={openModal} />

            <TaskModal
                isOpen={isModalOpen}
                title="Nova tarefa"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onAdd={addTask}
                onClose={closeModal}
            />
        </main>
    )
}
