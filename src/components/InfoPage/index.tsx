import styles from './InfoPage.module.scss'


type InfoPageProps = {
    imageUrl: string,
    title: string,
    description: string
}
const InfoPage: React.FC<InfoPageProps> = ({imageUrl, title, description}) => {
    return <>
        <div className={styles.container}>
            <img src={imageUrl} alt={title}/>
            <h2 >{title}</h2>
            <p>{description}</p>
        </div>
    </>
}

export default InfoPage;