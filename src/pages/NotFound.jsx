import React from "react";
import InfoPage from "../components/InfoPage";


const NotFound = () => {
    return (
        <div style={{marginTop: '6rem', display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <InfoPage imageUrl="/img/emoji-1.png" description="Ничего не найдено" title="К сожалению данная страница отсутствует в нашем интернет-магазине"/>
        </div>
    )
}

export default NotFound