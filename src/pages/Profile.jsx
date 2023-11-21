import React from "react";
import Card from "../components/Card";
import axios from "axios";
import {Link} from "react-router-dom";
import AppContext from "../context";

function Profile() {
    const {items, userId} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isAdmin, setIsAdmin] = React.useState(true)
    const editItems = isAdmin && items.length > 0
    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://6501dcae736d26322f5c672c.mockapi.io/orders`)
                setOrders(data.map(obj => obj.sneakers).flat())
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })()
    }, [])
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between">
                <div className="mb-20">
                    <h1>Профиль rel1segod</h1>
                </div>
                {isAdmin &&
                    <div className="d-flex align-center justify-center">
                        <Link to="/admin">
                            <button className="greenButtonClose">
                                Добавить товары
                            </button>
                        </Link>
                    </div>}
            </div>
            {orders.length !== 0 && <>
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
            </>
            }
            {
                editItems && (<>
                        <div className="d-flex align-center justify-between mb-40">
                            <h1>Редактировать товары</h1>
                        </div>
                        <div className="d-flex flex-wrap">
                            {(isLoading ? [...Array(10)] : items).map((item, index) => (
                                <Card key={index}
                                      isAdmin={isAdmin}
                                      loading={isLoading}
                                      {...item}
                                />
                            ))}
                        </div>
                    </>
                )
            }

        </div>);
}

export default Profile;