import React from "react";
import Card from "../components/Card";
import InfoPage from "../components/InfoPage";
import emojiImg from "../assets/img/emoji-1.png"


import {useDispatch} from "react-redux";
import {addToFavorite} from "../redux/favorites/favoriteSlice";
import {useAutoAnimate} from "@formkit/auto-animate/react";

function Favorites({items}) {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState(true);
    const [parent] = useAutoAnimate()

    const mapItemToPayload = (item) => ({
        id: item.id,
        parentId: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
    });

    const onAddToFavorite = item => {
        const payload = mapItemToPayload(item)
        dispatch(addToFavorite(payload))
    }

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="content p-40">
                    <div className="d-flex align-center justify-between mb-40">
                        <h1>Мои закладки</h1>
                    </div>
                    <div className="d-flex flex-wrap">
                        {
                            [...Array(10)].map((item, index) => (
                                <Card key={index}
                                      loading={isLoading}
                                />
                            ))
                        }
                    </div>
                </div>
            ) : (
                items.length > 0 ? (
                    <div className="content p-40">
                        <div className="d-flex align-center justify-between mb-40">
                            <h1>Мои закладки</h1>
                        </div>
                        <div className="d-flex flex-wrap" ref={parent}>
                            {items.map((item) => {
                                const newItem = {...item, id: item.parentId};
                                return (
                                    <Card key={newItem.id} onAddToFavorite={() => onAddToFavorite(newItem)} {...newItem} />
                                );
                                }
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6rem"}}>
                        <InfoPage imageUrl={emojiImg} title="Закладок нет"
                                  description="Вы ничего не добавляли в закладки"/>
                    </div>
                )
            )}
        </>
    );
}

export default Favorites;