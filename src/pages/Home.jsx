import searchImg from "../assets/img/search.svg";
import btnRemoveImg from "../assets/img/btn-remove.svg";
import Card from "../components/Card";
import React from "react";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {addToFavorite} from "../redux/favoriteSlice";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Home = ({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  isLoading
              }) => {
    const dispatch = useDispatch();
    const [parent] = useAutoAnimate()
    const mapItemToPayload = (item) => ({
        id: item.id,
        parentId: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
    });

    const onAddToCart = item => {
        const payload = mapItemToPayload(item)
        dispatch(addToCart(payload));
    };

    const onAddToFavorite = item => {
        const payload = mapItemToPayload(item)
        dispatch(addToFavorite(payload))
    }

    const renderItems = () => {
        if (!items || items.length === 0) {
            return null;
        }

        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (
            isLoading ? [...Array(10)] : filteredItems
        ).map((item, index) => (
            <Card
                key={item.id}
                onAddToFavorite={() => onAddToFavorite(item)}
                onAddToCart={() => onAddToCart(item)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="searchBlock d-flex">
                    <img src={searchImg} alt="Search" />
                    {searchValue &&
                        <img onClick={() => setSearchValue('')} className="clear cu-p" src={btnRemoveImg} alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск" />
                </div>
            </div>
            <div className="d-flex flex-wrap " ref={parent}>
                {renderItems()}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
