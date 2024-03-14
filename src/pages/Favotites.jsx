import React from "react";
import Card from "../components/Card";
import AppContext from "../context";
import InfoPage from "../components/InfoPage";

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext)
    const [isLoading, setLoading] = React.useState(true);


    // Имитация загрузки данных
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
                favorites.length > 0 ? (
                    <div className="content p-40">
                        <div className="d-flex align-center justify-between mb-40">
                            <h1>Мои закладки</h1>
                        </div>
                        <div className="d-flex flex-wrap">
                            {favorites.map((item, index) => (
                                <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6rem"}}>
                        <InfoPage imageUrl="/img/emoji-1.png" title="Закладок нет" description="Вы ничего не добавляли в закладки"/>
                    </div>
                )
            )}
        </>
    );
}

export default Favorites;