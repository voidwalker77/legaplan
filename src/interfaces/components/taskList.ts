export interface TaskListProps {
    tasks: { id: number; title: string; completed: boolean }[]
    onToggle: (id: number) => void
    onDelete: (task: { id: number; title: string; completed: boolean }) => void
    title: string
}
