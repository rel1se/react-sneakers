import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from '../Registration/Registration.module.scss'


const Admin = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onChange",
    })

    const onSubmit = async obj => {
        try{
            await axios.post("http://localhost:8088/sneakers", obj)
        }
        catch (error){
            alert(error.response.data)
        }
        reset()
    }
    return (
        <div className={styles.registrationContainer}>
            <h2>Добавление нового товара</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('title',
                    {required: 'Название товара обязательное поле'})}
                       type='text'
                       placeholder="Название товара"
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
                       placeholder="Цена товара"
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
                       placeholder="Ссылка на изображение"
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

export default Admin;
