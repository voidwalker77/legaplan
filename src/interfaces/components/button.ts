import { ReactNode } from 'react'

export interface ButtonProps {
    title?: ReactNode
    onClick?: () => void
    width?: string
    height?: string
    backgroundColor?: string
    color?: string
}
