import styles from './Drawer.module.css'

function Drawer({onClose, onRemove, items = []}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove"/>
                </h2>
                {
                    items.length > 0 ? <div>
                            <div className={styles.items}>
                                {items.map((obj) => (
                                    <div className="cartItem d-flex align-center mb-20">
                                        <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                             className={styles.cartItemImg}></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                             src="/img/btn-remove.svg"
                                             alt="Remove"/>
                                    </div>
                                ))}
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
                                    <button className={styles.greenButton}>Оформить заказ<img src="/img/arrow.svg"
                                                                                              alt="Arrow"/>
                                    </button>
                                </ul>
                            </div>
                        </div> :
                        <div className={styles.cartEmpty}>
                            <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty"/>
                            <h2 className="mb-20">Корзина пустая</h2>
                            <p className="mb-20 opacity-6">Добавьте хотя бы один товар, чтобы сделать заказ</p>
                            <button onClick={onClose} className={styles.greenButtonClose}>
                                <img src="/img/arrow.svg" alt="Arrow"/>Вернуться назад
                            </button>
                        </div>

                }
            </div>
        </div>)
        ;
}

export default Drawer;