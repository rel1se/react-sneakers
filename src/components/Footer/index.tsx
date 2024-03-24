import styles from "./Footer.module.scss"
import githubImg from "../../assets/img/github.svg"
import telegramImg from "../../assets/img/telegram.svg"
import mailImg from "../../assets/img/email.svg"
import React from "react";

const Footer: React.FC = () => {
    return (
        <div className={styles.container}>
            <ul>
                <li><a className={styles.link} href="https://t.me/rel1seg0d">Telegram</a>
                    <img src={telegramImg} alt="Telegram" className={styles.socialIcon}/>
                </li>
                <li><a className={styles.link} href="mailto:botoevslava27032003@mail.ru">Email</a><
                    img src={mailImg} alt="Email" className={styles.socialIcon}/></li>
                <li><a className={styles.link} href="https://github.com/rel1se">Github</a>
                    <img src={githubImg} alt="Github" className={styles.socialIcon}/>
                </li>
                <li>
                    <p>👋</p>
                </li>
            </ul>
        </div>)
}

export default Footer;