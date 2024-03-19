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
import {useDispatch, useSelector} from "react-redux";
import {setCartItems} from "./redux/cartSlice";
import {setFavorites} from "./redux/favoriteSlice";


function App() {
    const [items, setItems] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)
    const cart = useSelector((state) => state.cart.cartItems)
    const favorites = useSelector(state => state.favorite.favoriteItems)
    const dispatch = useDispatch();


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
                    axios.get('https://ac15aa85171c1f7c.mokky.dev/sneakers'),
                    axios.get(`https://ac15aa85171c1f7c.mokky.dev/cart`),
                    axios.get('https://ac15aa85171c1f7c.mokky.dev/favorites')
                ]);
                setItems(itemsResponse.data)
                dispatch(setCartItems(cartResponse.data));
                dispatch(setFavorites(favoritesResponse.data))
                setIsLoading(false);
            } catch (error) {
                console.log('Ошибка при запросе данных ;(');
            }
        };
        fetchData()
    }, [])
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }


    return (
        <AppContext.Provider value={{
            items,
            setCartOpened,
            setItems
        }}>
            <div className="wrapper clear">
                <Drawer items={cart} onClose={() => setCartOpened(false)}
                        opened={cartOpened}/>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="" element={
                            <Home
                                items={items}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                isLoading={isLoading}
                            />}/>
                        <Route path="favorites" element={
                            <Favorites items={favorites}/>
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