import React from "react";
import Card from "../components/Card";
import axios from "axios";
import Index from "../components/InfoPage";
import InfoPage from "../components/InfoPage";

function Profile() {
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://ac15aa85171c1f7c.mokky.dev/orders`)
                setOrders(data.map(obj => obj.sneakers).flat())
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    }, [])
    return (
        <>
            {
                isLoading ? (<div className="content p-40">
                    <div className="d-flex align-center justify-between mb-40">
                        <h1>Мои заказы</h1>
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
                </div> ):(
                    orders.length > 0 ? <div className="content p-40">
                        {orders.length !== 0 ? <>
                                <div className="d-flex align-center justify-between mb-40">
                                    <h1>Мои заказы</h1>
                                </div>
                                <div className="d-flex flex-wrap">
                                    {(isLoading ? [...Array(10)] : orders).map((item, index) => (
                                        <Card key={index}
                                              loading={isLoading}
                                              {...item}
                                        />
                                    ))}
                                </div>
                            </> :
                            <>
                                <Index/>
                            </>
                        }
                    </div> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6rem"}}>
                        <InfoPage imageUrl="/img/emoji-2.png" title="Заказов нет"
                                  description="Вы нищеброд? Оформите хотя бы один заказ"/>
                    </div>
                )
            }
        </>
    );
}

export default Profile;