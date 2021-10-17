import React from "react"
import { Footer } from "../../components/Footer"
import styles from './MainLayout.module.scss'

export const MainLayout = ({children,noScroll}:{children?:React.ReactNode,noScroll?:boolean}) => {
    return(
        <section className={`d-flex flex-column bg-dark ${styles.main_layout} ${noScroll ? styles.no_scroll: ''}`}>
            <div className={`flex-grow-1 max-height-no-margin ${styles.contents}`}>
            {children}
            </div>
            <Footer/>
        </section>
    )
}