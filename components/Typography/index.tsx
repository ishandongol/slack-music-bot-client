import styles from './Typography.module.scss';

export interface TypographyProps {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small";
  variant?: "title" | "subtitle" | "body";
  className?:string
}
export const Typography: React.FC<TypographyProps> = (props) => {
  const { as = "p", children,variant='body',className='', ...rest } = props;
  const Component = as;
  return <Component {...rest} className={`${styles[variant]} ${className}`}>{children}</Component>;
};
