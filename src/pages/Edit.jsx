import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from '../components/Registration/Registration.module.css'
import {useLocation, useNavigate} from "react-router-dom";


const Edit = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onChange",
    })

    const onSubmit = async (obj) => {
        try{
            await axios.put(`http://localhost:8088/sneakers?sneakerId=${item.id}`, obj)
            navigate("/")
        }
        catch (error){
            alert(error.response.data)
        }
        reset()
    }
    return (
        <div className={styles.registrationContainer}>
            <h2>Редактирование товара №{item.id}</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('title',
                    {required: 'Название товара обязательное поле'})}
                       type='text'
                       placeholder="Новое название товара"
                       defaultValue={item.title}
                />
                {errors?.title && (
                    <div className={styles.error}>
                        {errors.title.message}
                    </div>
                )}
                <input {...register('price',
                    {required: 'Цена товара обязательное поле'
                    })}
                       type='number'
                       placeholder="Новая цена товара"
                       defaultValue={item.price}
                />
                {errors?.price && (
                    <div className={styles.error}>
                        {errors.price.message}
                    </div>
                )}
                <input {...register('imageUrl',
                    {required: 'Ссылка на изображение обязательное поле',
                    })}
                       type='text'
                       placeholder="Новая ссылка на изображение"
                       defaultValue={item.imageUrl}
                />
                {errors?.imageUrl && (
                    <div className={styles.error}>
                        {errors.imageUrl.message}
                    </div>
                )}
                <button>Отправить</button>
            </form>
        </div>
    );
}

export default Edit;
