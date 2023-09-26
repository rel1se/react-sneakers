import React from "react";
import Card from "../components/Card";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import AppContext from "../context";

function Orders(){
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get("https://6501dcae736d26322f5c672c.mockapi.io/orders")
                setOrders(data.map(obj => obj.items).flat())
                setIsLoading(false)
            }catch (error){
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    }, [])
    return (
        <div className="content p-40">
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
    </div>);
}

export default Orders;