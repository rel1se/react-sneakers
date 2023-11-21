import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from './Registration.module.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import AppContext from "../../context";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_NUMBER_REGEXP = /^[\d\+][\d\(\)\ -]{4,14}\d$/;

const Registration = () => {
    const {setUserId} = React.useContext(AppContext)
    const navigate = useNavigate();
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
            await axios.post(`http://localhost:8088/users`, obj)
            setUserId(obj.id)
            navigate("/")
        }
        catch (error){
            alert(error.response.data)
        }
        reset()
    }
    return (
        <div className={styles.registrationContainer}>
            <h2>Регистрация</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email',
                    {required: 'Email обязательное поле',
                        pattern: {
                            value: EMAIL_REGEXP,
                            message: 'Пожалуйста, введите корректный email'
                        }
                    })}
                       type='text'
                       placeholder="Email"
                />
                {errors?.email && (
                    <div className={styles.error}>
                        {errors.email.message}
                    </div>
                )}

                <input {...register('password',
                    {required: 'Пароль обязательное поле'})}
                       type='password'
                       placeholder="Пароль"
                />
                {errors?.password && (
                    <div className={styles.error}>
                        {errors.password.message}
                    </div>
                )}
                <input {...register('phoneNumber',
                    {required: 'Номер телефона обязательное поле',
                        pattern: {
                            value: PHONE_NUMBER_REGEXP,
                            message: 'Пожалуйста, введите корректный номер телефона'
                        }
                    })}
                       type='text'
                       placeholder="Номер телефона"
                />
                {errors?.phoneNumber && (
                    <div className={styles.error}>
                        {errors.phoneNumber.message}
                    </div>
                )}
                <input {...register('username',
                    {required: 'Имя пользователя обязательное поле'})}
                       type='text'
                       placeholder="Имя пользователя"
                />
                {errors?.username && (
                    <div className={styles.error}>
                        {errors.username.message}
                    </div>
                )}
                <button>Зарегестрироваться</button>
            </form>
        </div>
    );
}

export default Registration;
