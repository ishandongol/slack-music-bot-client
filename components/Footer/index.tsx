import config from '../../config'
import styles from './Footer.module.scss'

export const Footer = () => {
    return(
        <footer className={styles.footer}>
            <img src={`${config.baseUrl}/images/wave.png`} width="100%" alt="Wave"/>
            </footer>
    )
}