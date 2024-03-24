import React from "react";
import InfoPage from "../components/InfoPage";
import emojiImg from "../assets/img/emoji-1.png"


const NotFound: React.FC = () => {
    return (
        <div style={{marginTop: '6rem', display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <InfoPage imageUrl={emojiImg} description="Ничего не найдено" title="К сожалению данная страница отсутствует в нашем интернет-магазине"/>
        </div>
    )
}

export default NotFound