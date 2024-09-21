'use client'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

const NotFoundPage = () => {
    const router = useRouter()

    const handleRedirect = () => {
        router.push('/home-tarefas')
    }

    return (
        <div className={styles.notFoundContainer}>
            <h1>404</h1>
            <p>Página não encontrada</p>
            <Button
                title="Voltar para Home"
                onClick={handleRedirect}
                width="250px"
            />
        </div>
    )
}

export default NotFoundPage
