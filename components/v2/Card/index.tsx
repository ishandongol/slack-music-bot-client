import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  subTitle: string;
  image: string;
  onAddClick?: () => void
  onClick?:() => void
}
export const Card = (props: CardProps) => {
  const { title, subTitle, image,onAddClick } = props;
  return (
    <div className={`card ${styles.card} `}>
      <img src={image} className={`card-img-top ${styles.image}`} alt={title} />
      <div className="card-body">
        <p className={`card-text ${styles.card_title} mb-2`} title={title}>
          {title}
        </p>
        <p
          className={`card-text ${styles.card_subtitle} text-gray`}
          title={subTitle}
        >
          {subTitle}
        </p>
        {onAddClick && <div className="position-absolute" style={{right:'1rem',bottom:'1rem'}}>
          <button className="btn btn-link text-muted p-0" type="button" onClick={onAddClick}>
            <FontAwesomeIcon
              icon={findIconDefinition({
                prefix: "fas",
                iconName: "plus-circle",
              })}
            />
          </button>
        </div>}
      </div>
    </div>
  );
};

interface HorizontalCardProps extends CardProps {
  isNext?:boolean
  isCurrent?:boolean
}
export const HorizontalCard = (props: HorizontalCardProps) => {
  const { title, subTitle, image,onClick,isNext,isCurrent } = props;

  return (
    <div className={`card mb-3 ${styles.card} ${styles.horizontal} position-relative`} onClick={onClick}>
      {isNext && <span className={`badge position-absolute bg-primary ${styles.badge}`} >Up Next</span>}
      {isCurrent && <span className={`badge position-absolute bg-success ${styles.badge}`} >Playing</span>}
      <div className="row g-0 ">
        <div className="col-md-4 ">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className={`card-text ${styles.card_title} my-3`}>{title}</p>
            <p className={`card-text ${styles.card_subtitle} text-gray`}>
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
