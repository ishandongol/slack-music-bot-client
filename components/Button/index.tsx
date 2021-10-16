import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'outlined'

export type ButtonVariantClass = {
    [K in ButtonVariant]: string
}

const buttonVariantClass:ButtonVariantClass = {
    primary: 'btn-primary text-light',
    outlined: 'btn-dark border text-light'
}

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>  {
    variant?: ButtonVariant
}
export const Button:React.FC<ButtonProps> = (props) => {
    const {children,variant='primary',className='',...rest} = props;
    return(
        <button {...rest} className={`btn ${styles[variant] || ''} ${buttonVariantClass[variant]} ${styles.custom || ''} ${className}`}>{children}</button>
    )
}