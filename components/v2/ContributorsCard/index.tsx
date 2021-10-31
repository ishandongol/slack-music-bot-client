import styles from "./ContributorsCard.module.scss";

interface CardProps {
  children?:React.ReactNode
  image?:string
}
export const ContributorsCard = (props: CardProps) => {
  const { children,image } = props;
  return (
    <>

      <div className="d-flex align-items-center justify-content-center">
      {image && <img src={image} alt={image} className={`card img-fluid rounded-circle border border-secondary ${styles.image}`}/>}
      </div>
    <div className={`card ${styles.card} `}>
      <div className="card-body text-center mt-3">
      {children}
      </div>
    </div>
    </>
  );
};