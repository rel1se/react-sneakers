import React from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favotites";
import AppContext from "./context";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        async function fetchData() {
            try{
                setIsLoading(true)
                const cartResponse = await axios.get("https://6505ec62ef808d3c66f0a230.mockapi.io/cart")
                const favoritesResponse = await axios.get('https://6501dcae736d26322f5c672c.mockapi.io/favorites')
                const itemsResponse = await axios.get("https://6505ec62ef808d3c66f0a230.mockapi.io/items")
                setIsLoading(false)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            }
            catch(error){
                alert('Ошибка при запросе данных; (');
                console.error(error)
            }
        }
        fetchData()
    }, [])
    const onAddToCart = async (obj) => {
        // try{
        //     const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id))
        //     if (findItem){
        //         setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        //         await axios.delete(`https://6505ec62ef808d3c66f0a230.mockapi.io/cart/${obj.id}`)
        //     }
        //     else{
        //         setCartItems(prev => [...prev, obj])
        //         const {data} = await axios.post('https://6505ec62ef808d3c66f0a230.mockapi.io/cart', obj)
        //         setCartItems((prev) => {
        //             prev.map(item => {
        //                 if(item.id === data.id){
        //                     return{
        //                         ...item,
        //                         id: data.id
        //                     }
        //                 }
        //                 return item
        //             })
        //         })
        //     }
        // }
        // catch (error){
        //     alert('Ошибка при добавлении в корзину')
        //     console.error(error)
        // }
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://6505ec62ef808d3c66f0a230.mockapi.io/cart/${obj.id}`)

        } else {
            axios.post("https://6505ec62ef808d3c66f0a230.mockapi.io/cart", obj).then(res => setCartItems(prev => [...prev, res.data]))
        }
    }
    const onRemoveItem = (id) => {
        axios.delete(`https://6505ec62ef808d3c66f0a230.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter(item => item.id !== id))
    }
    const onAddToFavorite = async (obj) => {
        try{
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://6501dcae736d26322f5c672c.mockapi.io/favorites/${obj.id}`)
                // !!! setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post("https://6501dcae736d26322f5c672c.mockapi.io/favorites", obj)
                setFavorites(prev => [...prev, data])
            }
        }catch (error){
            alert('Не удалось добавить в фавориты')
            console.error(error)
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }
    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            setCartOpened,
            setCartItems
        }}>
            <div className="wrapper clear">
                {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" element={
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />
                    }>
                    </Route>
                    <Route path="/favorites" element={
                        <Favorites/>
                    }>
                    </Route>
                </Routes>
            </div>
        </AppContext.Provider>
    )
}

export default App;