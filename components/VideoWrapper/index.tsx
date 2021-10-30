import React from "react";
import styles from './VideoWrapper.module.scss';

export const VideoWrapper = ({children}:{children?:React.ReactNode}) => (
    <div className={styles.video_player}>
    {children}
</div>)


export const VideoWrapperClassic = ({children}:{children?:React.ReactNode}) => (
    <div className={styles.video_player_classic}>
    {children}
</div>)