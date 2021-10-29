import styles from './PageTitle.module.scss'

interface PageTitleProps{
    children:string
    className?:string
}
export const PageTitle = ({children,className=''}:PageTitleProps) => (
    <p className={`${styles.page_title} ${className}`}>{children}</p>
)