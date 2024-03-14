import styles from './InfoPage.module.scss'

const InfoPage = ({imageUrl, title, description}) => {
    return <>
        <div className={styles.container}>
            <img src={imageUrl} alt="Info image" />
            <h2 >{title}</h2>
            <p>{description}</p>
        </div>
    </>
}

export default InfoPage;