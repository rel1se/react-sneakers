import React from "react";
import styles from "./Drawer/Drawer.module.css";
import AppContext from "../context";

const Info = ({image, title, description, }) => {
    const {setCartOpened} = React.useContext(AppContext)
    return (
        <div className={styles.cartEmpty}>
            <img className="mb-20" width="120px" src={image} alt="Empty"/>
            <h2 className="mb-20">{title}</h2>
            <p className="mb-20 opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenButtonClose}>
                <img src="img/arrow.svg" alt="Arrow"/>Вернуться назад
            </button>
        </div>
    )
}

export default Info