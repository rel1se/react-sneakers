import btnRemove from "../../assets/img/btn-remove.svg"
import arrowImg from "../../assets/img/arrow.svg"

import styles from './Drawer.module.scss'

import React from "react";
import {useCart} from "../../hooks/useCart";
import axios from "axios";
import AppContext from "../../context";
import InfoPage from "../InfoPage";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose, onRemove, items = [], opened}) {
    const {user} = React.useContext(AppContext)
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/orders`,
                {sneakers: cartItems})
            console.log(data)
            await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart`, [])
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${item.id}`)
                await delay(500)
            }
        } catch (error) {
            alert("Не удалось создать заказ :(")
        }
        setIsLoading(false)
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src={btnRemove} alt="Remove"/>
                </h2>
                {
                    items.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className={styles.items}>
                                {items.map((obj) => (
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
                                        imageUrl='/img/complete-cart.jpg'
                                        title="Заказ оформлен"
                                        description={`Ваш заказ №${orderId} скоро будет передан курьерской доставке`}/> :
                                    <InfoPage
                                        imageUrl='/img/empty-cart.jpg'
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