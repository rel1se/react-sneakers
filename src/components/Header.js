function Header() {
    return (<header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
            <img className="mr-15" width={40} height={40} src="/img/logo.png"/>
            <div>
                <h3 className="text-uppercase">React Sneakers</h3>
                <p>Магазин лучших кроссовок</p>
            </div>
        </div>
        <ul className="d-flex">
            <li className="mr-30">
                <img className="mr-15" width={18} height={18} src="/img/cart.svg" alt="Cart"/>
                <span>5100 руб.</span>
            </li>
            <li>
                <img width={18} height={18} src="/img/user.svg" alt="User"/>
            </li>
        </ul>
    </header>);
}
export default Header;