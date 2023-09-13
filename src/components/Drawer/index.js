import styles from './Drawer.module.css'
function Drawer(props) {
    return (<div style={{display: 'none'}} className={styles.overlay}>
        <div className={styles.drawer}>
            <h2 className="mb-30 d-flex justify-between">Корзина <img className="removeBtn cu-p"
                                                                      src="/img/btn-remove.svg" alt="Remove"/></h2>
            <div className={styles.items}>
                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(./public/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>
                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(/img/sneakers/2.jpg'}} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские кроссовки Nike Blazer Mid Suede</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>
            </div>
            <div className={styles.cartTotalBlock}>
                <ul>
                    <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>21 498 руб. </b>
                    </li>
                    <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>1020 руб. </b>
                    </li>
                    <button className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow"/></button>
                </ul>
            </div>
        </div>
    </div>);
}

export default Drawer;