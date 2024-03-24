import React from 'react';
import Header from "../components/Header";
import {Outlet} from "react-router";
import AppContext from "../context";

const MainLayout: React.FC = () => {
    const {setCartOpened}: any = React.useContext(AppContext)
    return (
        <div>
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
}

export default MainLayout;