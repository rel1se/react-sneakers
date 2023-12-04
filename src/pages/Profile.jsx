import React from "react";
import Card from "../components/Card";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import AppContext from "../context";

function Profile() {
    const {items, user} = React.useContext(AppContext)
    const navigate = useNavigate()
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [isAdmin, setIsAdmin] = React.useState(false)
    const editItems = isAdmin && items.length > 0

    React.useEffect(() => {
        if (user.role === 'ADMIN')
            setIsAdmin(true)
    }, [])
    const onExit = async () => {
        try{
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            navigate("/")
        }
        catch (error){
            alert(error.response);
        }
    }
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
                    <h1>Профиль пользователя {user.email}</h1>
                </div>
                <div className="d-flex align-center justify-center">
                    <button className="greenButtonClose" onClick={onExit}>
                        Выйти из аккаунта
                    </button>
                </div>
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
                            {isAdmin &&
                                <div className="d-flex align-center justify-center">
                                    <Link to="/admin">
                                        <button className="greenButtonClose">
                                            Добавить товары
                                        </button>
                                    </Link>
                                </div>}
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