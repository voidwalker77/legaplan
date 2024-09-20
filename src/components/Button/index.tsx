import styles from './styles.module.scss'
import '../../styles/settings.module.scss'
import { ButtonProps } from 'interfaces/components/button'

const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    width,
    height,
    backgroundColor,
    color
}) => {
    const isGradient = backgroundColor?.includes('linear-gradient')

    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                width: width ?? width,
                height: height ?? '51px',
                background:
                    backgroundColor ??
                    'linear-gradient(90deg, var(--buttonColor-1), var(--buttonColor-2))',
                backgroundColor: !isGradient ? backgroundColor : undefined,
                color: color ?? '#fff',
            }}
        >
            {title}
        </button>
    )
}

export default Button
