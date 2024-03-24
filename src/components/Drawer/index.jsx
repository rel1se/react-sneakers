import btnRemove from "../../assets/img/btn-remove.svg"
import arrowImg from "../../assets/img/arrow.svg"
import completeCartImg from "../../assets/img/complete-order.jpg"
import emptyCartImg from "../../assets/img/empty-cart.jpg"

import styles from './Drawer.module.scss'

import React from "react";
import {useCart} from "../../hooks/useCart";
import axios from "axios";
import InfoPage from "../InfoPage";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/cart/cartSlice";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const Drawer = ({onClose, opened}) => {
    const {cartItems, updateCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const dispatch = useDispatch()
    const [parent] = useAutoAnimate()
    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://ac15aa85171c1f7c.mokky.dev/orders',
                {sneakers: cartItems})
            await axios.patch(`https://ac15aa85171c1f7c.mokky.dev/cart`, [])
            setOrderId(data.id)
            setIsOrderComplete(true)
            updateCartItems([])
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    const onRemove = (id) =>{
        dispatch(removeFromCart(id))
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src={btnRemove} alt="Remove"/>
                </h2>
                {
                    cartItems.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className={styles.items} ref={parent}>
                                {cartItems.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                             className={styles.cartItemImg}></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                             src={btnRemove}
                                             alt="Remove"/>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{Math.round((totalPrice / 100) * 5)} руб. </b>
                                    </li>
                                    <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                                        Оформить заказ <img src={arrowImg} alt="Arrow"/>
                                    </button>
                                </ul>
                            </div>
                        </div> : (
                            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "16rem"}}>
                                {isOrderComplete ?
                                    <InfoPage
                                        imageUrl={completeCartImg}
                                        title="Заказ оформлен"
                                        description={`Ваш заказ №${orderId} скоро будет передан курьерской доставке`}/> :
                                    <InfoPage
                                        imageUrl={emptyCartImg}
                                        title="Корзина пустая"
                                        description={`Добавьте хотя бы один товар, чтобы сделать заказ`}
                                    />}

                            </div>
                        )
                }
            </div>
        </div>)
        ;
}

export default Drawer;