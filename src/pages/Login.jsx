import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from '../components/Registration/Registration.module.css'
import {Link} from "react-router-dom";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_NUMBER_REGEXP = /^[\d\+][\d\(\)\ -]{4,14}\d$/;

const Login = () => {

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
            await axios.post("http://localhost:8088/users", obj)
        }
        catch (error){
            alert(error.response.data)
        }
        reset()
    }
    return (
        <div className={styles.registrationContainer}>
            <h2>Войдите в аккаунт React Sneakers</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email',
                    {required: 'Email обязательное поле'})}
                       type='text'
                       placeholder="Электронная почта"
                />
                {errors?.email && (
                    <div>
                        {errors.email.message}
                    </div>
                )}
                <input {...register('password',
                    {required: 'Пароль обязательное поле'})}
                       type='password'
                       placeholder="Пароль"
                />
                {errors?.password && (
                    <div>
                        {errors.password.message}
                    </div>
                )}
                <Link to="">
                    <button>Отправить</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;
