import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subTitle: string;
  image: string;
}
export const Card = (props: CardProps) => {
  const { title, subTitle, image } = props;
  return (
    <div className={`card ${styles.card} `}>
      <img src={image} className={`card-img-top ${styles.image}`} alt={title} />
      <div className="card-body">
        <p className={`card-text ${styles.card_title} mb-2`}>{title}</p>
        <p className={`card-text ${styles.card_subtitle} text-gray`}>
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export const HorizontalCard = (props: CardProps) => {
  const { title, subTitle, image } = props;

  return (
    <div className={`card mb-3 ${styles.card} ${styles.horizontal}`}>
      <div className="row g-0 ">
        <div className="col-md-4 ">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
          <p className={`card-text ${styles.card_title} mb-2`}>{title}</p>
        <p className={`card-text ${styles.card_subtitle} text-gray`}>
          {subTitle}
        </p>
          </div>
        </div>
      </div>
    </div>
  );
};
