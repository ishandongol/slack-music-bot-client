import config from "../../config"

import styles from './BrandImage.module.scss';

export interface BrandImageProps {
    size?: 'small' | 'large'
    className?:string
}
export const BrandImage = (props:BrandImageProps) => {
    const {size = 'large',className=''} = props;
    return(
        <img src={`${config.baseUrl}/images/logo.png`} className={`${styles[size] || ''} ${className}`} alt="Music Playground"/>
    )
}