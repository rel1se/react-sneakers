import arrowImg from "../assets/img/arrow.svg"

import React from "react";
import styles from "./Drawer/Drawer.module.scss";
import AppContext from "../context";
import completeOrderImg from '../assets/img/complete-order.jpg'
import emptyCartImg from "../assets/img/empty-cart.jpg"

const Info = ({image, title, description, }) => {
    const {setCartOpened} = React.useContext(AppContext)
    return (
        <div className={styles.cartEmpty}>
            <img className="mb-20" width="120px" src={image ? completeOrderImg : emptyCartImg} alt="Empty"/>
            <h2 className="mb-20">{title}</h2>
            <p className="mb-20 opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButtonClose}>
                <img src={arrowImg} alt="Arrow"/>Вернуться назад
            </button>
        </div>
    )
}

export default Info