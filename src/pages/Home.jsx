import searchImg from "../assets/img/search.svg";
import btnRemoveImg from "../assets/img/btn-remove.svg";
import Card from "../components/Card";
import React from "react";
import Footer from "../components/Footer";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/cart/cartSlice";
import {addToFavorite} from "../redux/favorites/favoriteSlice";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import Slider from "../components/Slider";


// type HomeProps = {
//     items: Sneaker[],
//     searchValue: string,
//     setSearchValue: Dispatch<SetStateAction<string>>,
//     onChangeSearchInput: (event: ChangeEvent<HTMLInputElement>) => void,
//     isLoading: boolean,
//     setSort: Dispatch<SetStateAction<string>>
// }
const Home = ({
                                       items,
                                       searchValue,
                                       setSearchValue,
                                       onChangeSearchInput,
                                       isLoading,
                                       setSort
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


    const onAddToCart = (item) => {
        const payload= mapItemToPayload(item);
        dispatch(addToCart(payload));
    };
    const onAddToFavorite = (item) => {
        const payload = mapItemToPayload(item)
        dispatch(addToFavorite(payload))
    }

    const onChangeSort = (event) => {
        setSort(event.target.value)
    }

    const renderItems = () => {
        if (!items || items.length === 0) {
            return null;
        }

        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (
            isLoading ? [...Array(10)] : filteredItems
        ).map((item) => (
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
            <Slider/>
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="d-flex align-end justify-between mr-5 ml-10">
                    <select onChange={onChangeSort}>
                        <option value="title">По названию</option>
                        <option value="price">По цене (дешевые)</option>
                        <option value="-price">По цене (дорогие)</option>
                    </select>
                    <div className="searchBlock d-flex">
                        <img src={searchImg} alt="Search"/>
                        {searchValue &&
                            <img onClick={() => setSearchValue('')} className="clear cu-p" src={btnRemoveImg}
                                 alt="Clear"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"/>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap " ref={parent}>
                {renderItems()}
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
