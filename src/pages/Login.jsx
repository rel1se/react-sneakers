import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from '../components/Registration/Registration.module.scss'
import {Link, useNavigate} from "react-router-dom";


const Login = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onChange",
    })
    const authenticateUser  = async (obj) => {
        const response = await axios.post('http://localhost:8088/auth/login', obj);
        const data = await response.data;
        if (response.status === 200) {
            localStorage.setItem('jwt', data.jwt);
        } else {
            alert("Неверные данные пользователя")
        }
    }
    const onSubmit = async obj => {
        try{
            authenticateUser(obj)
            navigate("/")
        } catch (error){
            console.error(error)
            alert(error)
        }
        reset()
    };
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
                <p className={styles.registrationLink}>Еще нет аккаунта React Sneakers? <Link style={{color: "red"}} to="/registration">Зарегестрируйтесь</Link></p>
                <button>Войти</button>
            </form>
        </div>
    );
}

export default Login;
