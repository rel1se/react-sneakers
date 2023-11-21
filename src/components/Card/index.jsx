import likedImage from "../../assets/img/liked.svg"
import unlikedImage from "../../assets/img/unliked.jpg"
import btnChecked from "../../assets/img/btn-checked.svg"
import btnPlus from "../../assets/img/btn-plus.svg"
import btnRemove from "../../assets/img/btn-remove.svg"
import editImg from "../../assets/img/edit.png"

import React from "react";
import ContentLoader from "react-content-loader";
import styles from './Card.module.css'
import AppContext from "../../context";
import {Link, useNavigate} from "react-router-dom";

function Card({
                  id,
                  title,
                  imageUrl,
                  price,
                  isAdmin,
                  onPlus,
                  onFavorite,
                  loading = false
              }) {
    const {isItemAdded, isItemFavorited, onRemoveItem} = React.useContext(AppContext)
    const obj = {id, parentId: id, title, price, imageUrl}
    const onClickPlus = () => {
        onPlus(obj)
    }
    const onClickFavorite = () => {
        onFavorite(obj)
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
                        {onFavorite &&
                            <img className={styles.favorite}
                                 onClick={onClickFavorite}
                                 src={isItemFavorited(id) ? likedImage : unlikedImage}
                                 alt="Unliked"/>
                        }
                        {isAdmin &&
                            <img className={styles.favorite}
                                 onClick={() => onRemoveItem(obj.id)}
                                 src={btnRemove}
                                 alt="Remove"/>
                        }
                        <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <p>Цена: </p>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus &&
                                <img className={styles.plus}
                                     onClick={onClickPlus}
                                     src={isItemAdded(id) ? btnChecked : btnPlus}
                                     alt="Plus"
                                />}
                            {isAdmin &&
                                <Link to={`/edit`} state={{ item: obj }}>
                                    <img className={styles.edit} src={editImg} alt="Edit" />
                                </Link>
                            }
                        </div>
                    </>
            }
        </div>
    );
}

export default Card;
