import React from "react"
import { Footer } from "../../components/Footer"
import styles from './MainLayout.module.scss'

export const MainLayout = ({children}:{children?:React.ReactNode}) => {
    return(
        <section className={`d-flex flex-column bg-dark ${styles.main_layout}`}>
            <div className={`flex-grow-1 ${styles.contents}`}>
            {children}
            </div>
            <Footer/>
        </section>
    )
}