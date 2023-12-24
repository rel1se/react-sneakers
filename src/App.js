import React from 'react'
import {json, Route, Routes} from 'react-router-dom'
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favotites";
import AppContext from "./context";
import Profile from "./pages/Profile";
import Registration from "./components/Registration";
import Admin from "./components/Admin";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";


function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState({})

    React.useEffect(() => {

    }, [])
    React.useEffect(() => {
        const fetchData = async (user) => {
            try {
                const itemsResponse = await axios.get('http://localhost:8088/sneakers/all')
                setItems(itemsResponse.data)
                if (JSON.stringify(user) !== '{}'){
                    const [cartResponse, favoritesResponse] = await Promise.all([
                        axios.get(`http://localhost:8088/cart?userId=${user.id}`),
                        axios.get(`http://localhost:8088/favorites?userId=${user.id}`)
                    ]);
                    setCartItems(cartResponse.data);
                    setFavorites(favoritesResponse.data);
                }
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        };
        console.log(user)
        fetchData(user)
    }, [user])
    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const fetchUserData = async (jwt) => {

            if (!jwt) {
                return;
            }
            const response = await axios.get(`http://localhost:8088/auth/users?jwt=${jwt}`)
            const userData = await response.data;
            localStorage.setItem('user', userData)
            setUser(userData)
            if (response.status === 200) {
                console.log('Получены данные пользователя:', userData);
            } else {
                alert("Ошибка при получений данных пользователя")
            }
        }
        fetchUserData(jwt)
    }, [])
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id))
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
                await axios.delete(`http://localhost:8088/cart?userId=${user.id}&sneakerId=${findItem.id}`)
            } else {
                setCartItems(prev => [...prev, obj])
                const {data} = await axios.post(`http://localhost:8088/cart?userId=${user.id}`, obj)
                setCartItems(prev => prev.map(item => {
                    if (item.id === data.id) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину')
            console.error(error)
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            const findItem = favorites.find(favObj => Number(favObj.id) === Number(obj.id))
            if (findItem) {
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
                await axios.delete(`http://localhost:8088/favorites?userId=${user.id}&sneakerId=${obj.id}`)
            } else {
                setFavorites(prev => [...prev, obj])
                const {data} = await axios.post(`http://localhost:8088/favorites?userId=${user.id}`, obj)
                setFavorites(prev => prev.map(item => {
                    if (item.id === data.id) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Не удалось добавить в избранное')
            console.error(error)
        }
    }
    const onRemoveFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/cart?userId=${user.id}&sneakerId=${id}`)
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Ошибка при удалении из корзины')
            console.error(error)
        }
    }
    const onRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/sneakers?sneakerId=${id}`)
            setItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Ошибка при удалении товара')
            console.error(error)
        }
    }
    const onEditItem = async (obj) => {
        try {
            await axios.put(`http://localhost:8088/sneakers?sneakerId=${obj.id}`, obj)
            setItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        } catch (error) {
            alert('Ошибка при редактировании товара')
            console.error(error)
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }
    const isItemFavorited = (id) => {
        return favorites.some(obj => Number(obj.id) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            isItemFavorited,
            onAddToCart,
            onAddToFavorite,
            setCartOpened,
            setCartItems,
            onRemoveItem,
            onEditItem,
            user,
            setUser,
            setItems
        }}>
            <div className="wrapper clear">
                <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveFromCart}
                        opened={cartOpened}/>
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="" element={
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            onRemoveItem={onRemoveItem}
                            isLoading={isLoading}
                        />
                    }>
                    </Route>
                    <Route path="favorites" element={
                        <Favorites/>
                    }>
                    </Route>
                    <Route path="profile" element={
                        <Profile/>
                    }>
                    </Route>
                    <Route path="admin" element={
                        <Admin/>
                    }>
                    </Route>
                    <Route path="edit" element={
                        <Edit/>
                    }>
                    </Route>
                    <Route path="registration" element={
                        <Registration/>
                    }>
                    </Route>
                    <Route path="login" element={
                        <Login/>
                    }>
                    </Route>
                    <Route path="*" element={
                        <NotFound/>
                    }>
                    </Route>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}


export default App;