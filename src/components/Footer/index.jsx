import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <div className={styles.container}>
            <ul>
                <li><a className={styles.link} href="https://t.me/rel1seg0d">Telegram</a>
                    <img src="/img/telegram.svg" alt="Telegram" className={styles.socialIcon}/>
                </li>
                <li><a className={styles.link} href="mailto:botoevslava27032003@mail.ru">Email</a><
                    img src="/img/email.svg" alt="Email" className={styles.socialIcon}/></li>
                <li><a className={styles.link} href="https://github.com/rel1se">Github</a>
                    <img src="/img/github.svg" alt="Github" className={styles.socialIcon}/>
                </li>
                <li>
                    <p>👋</p>
                </li>
            </ul>
        </div>)
}

export default Footer;