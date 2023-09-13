
function Card(props){
    const onClickButton = (event) =>{

    }
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Цена: </p>
                    <b>{props.price} руб.</b>
                </div>
                <button className="button" onClick={props.onClick}>
                    <img width={11} height={11} src="/img/plus.svg"/>
                </button>
            </div>
        </div>
    );
}
export default Card;
