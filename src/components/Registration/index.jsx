import React from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";

import styles from './Registration.module.scss'
import {useNavigate} from "react-router-dom";


const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const Registration = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onChange",
    })

    async function registerUser(obj) {
        const response = await axios.post('http://localhost:8088/auth/register', obj);
        const data = await response.data;
        if (response.status === 200) {
            localStorage.setItem('jwt', data.jwt);
        } else {
            alert("Неверные данные пользователя")
        }
    }

    const onSubmit = async obj => {
        try {
            registerUser(obj)
            navigate("/");
        } catch (error) {
            console.error(error)
            alert(error)
        }
        reset();
    };
    return (
        <div className={styles.registrationContainer}>
            <h2>Регистрация</h2>
            <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email',
                    {
                        required: 'Email обязательное поле',
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
                <button>Зарегестрироваться</button>
            </form>
        </div>
    );
}

export default Registration;
