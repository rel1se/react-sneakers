import likedImage from "../../assets/img/liked.svg"
import unlikedImage from "../../assets/img/unliked.jpg"
import btnChecked from "../../assets/img/btn-checked.svg"
import btnPlus from "../../assets/img/btn-plus.svg"

import React, {MouseEventHandler} from "react";
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss'
import {useSelector} from "react-redux";
import {selectIsItemAdded} from "../../redux/cart/selectors";
import {selectIsItemFavorite} from "../../redux/favorites/selectors";
import {CartItem} from "../../redux/cart/types";
import {FavoriteItem} from "../../redux/favorites/types";
import {RootState} from "../../redux/store";

// type CardProps = {
//     id: number,
//     title: string,
//     imageUrl: string,
//     price: number,
//     onAddToFavorite: (obj: FavoriteItem) => MouseEventHandler<HTMLImageElement>,
//     onAddToCart: (obj: CartItem) => MouseEventHandler<HTMLImageElement>,
//     loading: boolean
// }
const Card = ({
                  id,
                  title,
                  imageUrl,
                  price,
                  onAddToFavorite,
                  onAddToCart,
                  loading = false
              }) => {
    const  isItemFavorited = useSelector((state) => selectIsItemFavorite(state, id))

    const isItemAdded = useSelector((state) => selectIsItemAdded(state, id))

    const onClickPlus =  (obj) => {
        onAddToCart(obj);
    };
    const onClickFavorite = (obj) => {
        onAddToFavorite(obj)
    }
    return (
        <div className={styles.card}>
            {
                loading ? (
                        <ContentLoader
                            speed={2}
                            width={155}
                            height={250}
                            viewBox="0 0 155 265"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb">
                            <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
                            <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                            <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                            <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
                            <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                        </ContentLoader>
                    ) :
                    <>

                        <img className={styles.favorite}
                             onClick={onClickFavorite}
                             src={isItemFavorited ? likedImage : unlikedImage}
                             alt="Unliked"/>
                        <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <p>Цена: </p>
                                <b>{price} руб.</b>
                            </div>
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded ? btnChecked : btnPlus}
                                alt="Plus"
                            />
                        </div>
                    </>
            }
        </div>
    );
}

export default Card;
