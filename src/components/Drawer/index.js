import styles from './Drawer.module.css'
import Info from "../Info";
import React from "react";
import {useCart} from "../../hooks/useCart";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)

    const onClickOrder = async () => {
        try{
            setIsLoading(true)
            const {data} = await axios.post("https://6501dcae736d26322f5c672c.mockapi.io/orders",
                {items: cartItems})
            await axios.put("https://6505ec62ef808d3c66f0a230.mockapi.io/cart",[])
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])
            for (let  i= 0; i < cartItems.length; i++){
                const item = cartItems[i]
                await axios.delete("https://6505ec62ef808d3c66f0a230.mockapi.io/cart/" + item.id)
                await delay(1000)
            }
        }catch(error){
            alert("Не удалось создать заказ :(")
        }
        setIsLoading(false)
    }
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove"/>
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
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{Math.round((totalPrice / 100) * 5)} руб. </b>
                                    </li>
                                    <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                                        Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
                                    </button>
                                </ul>
                            </div>
                        </div> : (
                        <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                              description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы один товар, чтобы сделать заказ"}
                              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
                        )
                }
            </div>
        </div>)
        ;
}

export default Drawer;