import React from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from "axios";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favotites";
import AppContext from "./context";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";


function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)



    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
                    axios.get('https://ac15aa85171c1f7c.mokky.dev/sneakers'),
                    axios.get(`https://ac15aa85171c1f7c.mokky.dev/cart`),
                    axios.get('https://ac15aa85171c1f7c.mokky.dev/favorites')
                ]);
                setItems(itemsResponse.data)
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.log('Ошибка при запросе данных ;(');
            }
        };
        fetchData()
    }, [])
    const onAddToCart = async (sneaker) => {
        try {
            const findItem = cartItems.find((item) => item.parentId === sneaker.id)
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => item.parentId !== sneaker.id))
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${findItem.id}`)
            } else {
                setCartItems((prev) => [...prev, sneaker])
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/cart`, sneaker)
                setCartItems((prev) => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            console.log('Ошибка при добавлении в корзину')
        }
    }
    const onAddToFavorite = async (sneaker) => {
        try {
            const findItem = favorites.find(favObj => favObj.parentId === sneaker.id)
            console.log(findItem)
            if (findItem) {
                setFavorites((prev) => prev.filter((item) => item.parentId !== sneaker.id))
                console.log(favorites)
                console.log(sneaker.id)
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/favorites/${findItem.id}`)
            } else {
                setFavorites(prev => [...prev, sneaker])
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/favorites`, sneaker)
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
            console.log('Не удалось добавить в избранное')
        }
    }

    const onRemoveFromCart = async (id) => {
        try {
            await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${id}`)
            setCartItems((prev) => prev.filter((item) => item.id !== id))
        } catch (error) {
            console.log('Ошибка при удалении из корзины')
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    const isItemAdded = (id) => {
        return cartItems.some((obj) => obj.parentId === id)
    }
    const isItemFavorited = (id) => {
        return favorites.some((obj) => obj.id === id)
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
            setItems
        }}>
            <div className="wrapper clear">
                <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveFromCart}
                        opened={cartOpened}/>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="" element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />}/>
                        <Route path="favorites" element={
                            <Favorites/>
                        }/>
                        <Route path="profile" element={
                            <Profile/>
                        }/>
                        <Route path="*" element={
                            <NotFound/>
                        }/>
                    </Route>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}


export default App;