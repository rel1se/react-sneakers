import styles from './Card.module.css'
function Card(props){
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={props.onFavoriteClick}>
                <img src="/img/heart.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Цена: </p>
                    <b>{props.price} руб.</b>
                </div>
                <button className="button" onClick={props.onPlusClick}>
                    <img width={11} height={11} src="/img/plus.svg"/>
                </button>
            </div>
        </div>
    );
}
export default Card;
