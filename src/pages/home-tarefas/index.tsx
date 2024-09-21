import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../images/logo.svg'
import styles from './styles.module.scss'
import Button from 'components/Button'
import TaskList from '../../components/TaskList'
import TaskModal from '../../components/TaskModal'
import { Task } from 'interfaces/components/task'
import { getCurrentDate } from 'utils/getCurrentDate'

export default function MainPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskTitle, setTaskTitle] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'create' | 'delete'>('create')
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks')
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const openCreateModal = () => {
        setModalType('create')
        setIsModalOpen(true)
    }

    const openDeleteModal = (task: Task) => {
        setTaskToDelete(task)
        setModalType('delete')
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setTaskTitle('')
        setErrorMessage('')
        setTaskToDelete(null)
    }

    const addTask = () => {
        if (taskTitle.trim() === '') {
            setErrorMessage('Por favor, digite um título para a tarefa.')
            return
        }
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

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
            closeModal()
        }
    }

    return (
        <main className={styles.wrapper}>
            <header className={styles.header}>
                <Image
                    src={Logo}
                    alt="Logo da Focal Point"
                    height={100}
                    width={100}
                    className={styles.logo}
                />
                <div className={styles.centerText}>
                    <h2 className={styles.headerTitle}>
                        Bem-vindo de volta, Marcus
                    </h2>
                </div>

                <p className={styles.headerPhrase}>
                    {getCurrentDate()}
                </p>
            </header>

            <div className={styles.mainCard}>
                <TaskList
                    tasks={tasks.filter((task) => !task.completed)}
                    onToggle={toggleTaskCompletion}
                    onDelete={openDeleteModal}
                    title="Suas tarefas de hoje"
                />

                <TaskList
                    tasks={tasks.filter((task) => task.completed)}
                    onToggle={toggleTaskCompletion}
                    onDelete={openDeleteModal}
                    title="Tarefas finalizadas"
                />
            </div>
            <Button title="Adicionar nova tarefa" onClick={openCreateModal} width='250px'/>

            <TaskModal
                isOpen={isModalOpen}
                type={modalType}
                title={
                    modalType === 'create' ? 'Nova tarefa' : 'Excluir tarefa'
                }
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    setErrorMessage('')
                }}
                onConfirm={modalType === 'create' ? addTask : confirmDeleteTask}
                onClose={closeModal}
                errorMessage={errorMessage}
            />
        </main>
    )
}
