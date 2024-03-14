import searchImg from "../assets/img/search.svg"
import btnRemoveImg from "../assets/img/btn-remove.svg"

import Card from "../components/Card";
import React from "react";
import Footer from "../components/Footer";

const Home = ({items,
                        searchValue,
                        setSearchValue,
                        onChangeSearchInput,
                        onAddToCart,
                        onAddToFavorite,
                        isLoading}) => {
    const renderItems = () => {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
                <Card key={index}
                      onFavorite={(obj) => onAddToFavorite(obj)}
                      onPlus={(obj) => onAddToCart(obj)}
                      loading={isLoading}
                      {...item}
                />
            )
        )

    }
    return (<div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="searchBlock d-flex">
                <img src={searchImg} alt="Search"/>
                {searchValue &&
                    <img onClick={() => setSearchValue('')} className="clear cu-p" src={btnRemoveImg}
                         alt="Clear"/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"/>
            </div>
        </div>
        <div className="d-flex flex-wrap">
            {renderItems()}
        </div>
        <Footer/>
    </div>);
}

export default Home;