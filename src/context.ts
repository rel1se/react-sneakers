import React, {Dispatch, SetStateAction} from "react";
import {Sneaker} from './App'


interface contextTypes {
    items: Sneaker[],
    setCartOpened?:  Dispatch<SetStateAction<Boolean>>
}
const AppContext = React.createContext<contextTypes>({
    items: []
})

export default AppContext