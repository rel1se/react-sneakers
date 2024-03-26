import React from "react";
import Card from "../components/Card";
import axios from "axios";
import InfoPage from "../components/InfoPage";
import emojiImg from "../assets/img/emoji-2.png";

const Profile: React.FC = () => {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState<Boolean | undefined>(true);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const {data} = await axios.get(`https://ac15aa85171c1f7c.mokky.dev/orders`);
                setOrders(data);
                //setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        fetchOrders()
    }, []);
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);
    // }, []);

    return (
        <>
            {isLoading ? (
                <div className="content p-40">
                    <div className="d-flex align-center justify-between mb-40">
                        <h1>Мои заказы</h1>
                    </div>
                    <div className="d-flex flex-wrap">
                        {[...Array(10)].map((item, index) => (
                            <Card key={index} loading={isLoading} {...item} />
                        ))}
                    </div>
                </div>
            ) : (
                orders.length > 0 ? (
                    <div className="content p-40">
                        <div className="d-flex align-center justify-between mb-40">
                            <h1>Мои заказы</h1>
                        </div>
                        {orders.map((order: any, orderIndex: number) => (
                            <div key={orderIndex}>
                                <h2>Заказ №{orderIndex + 1}</h2>
                                <div className="d-flex flex-wrap">
                                    {order.sneakers.map((item: any, itemIndex: number) => (
                                        <Card key={itemIndex} loading={isLoading} {...item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<div
                    style={{
                        marginTop: '6rem',
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <InfoPage imageUrl={emojiImg} description="Вы нищеброд? Оформите хотя бы один заказ"
                              title="Заказов нет :("/>
                </div>)

            )}
        </>
    );
};

export default Profile;