import styles from './Playlist.module.scss'

export const Playlist:React.FC<{className?:string}> = ({children,className = ''}) => {
    return(
        <div className={`${styles.playlist} bg-secondary p-4 ${className}`}>
        {children}
        </div>
    )
}