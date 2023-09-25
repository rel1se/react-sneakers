import Card from "../components/Card";
import React from "react";

function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToCart,
                  onAddToFavorite,
                  isLoading
              })
{
    const renderItems = () => {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
                <Card key={index}
                      onFavorite={(obj) => onAddToFavorite(obj)}
                      onPlus={(obj) => onAddToCart(obj)}
                      // added={isItemAdded(item && item.id)}
                      // favorited={favorites.some(obj => Number(obj.id) === Number(item.id))}
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
                <img src="/img/search.svg" alt="Search"/>
                {searchValue &&
                    <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg"
                         alt="Clear"/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"/>
            </div>
        </div>
        <div className="d-flex flex-wrap">
            {renderItems()}
        </div>
    </div>);
}

export default Home;