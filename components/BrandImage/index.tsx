import config from "../../config"

import styles from './BrandImage.module.scss';

export interface BrandImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
    size?: 'small' | 'large'
}
export const BrandImage = (props:BrandImageProps) => {
    const {size = 'large',className='',alt,...rest} = props;
    return(
        <img {...rest} src={`${config.baseUrl}/images/logo.png`} className={`${styles[size] || ''} ${className}`} alt={alt || "Music Playground"}/>
    )
}