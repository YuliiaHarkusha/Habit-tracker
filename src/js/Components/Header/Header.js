import React from "react";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import "./_header.scss";

const Header = () => {
    const menuItems = [
        {title: "Home", url: "/"},
        {title: "Habits", url: "/habits"},
        {title: "Tracker", url: "/tracker"},
        {title: "Statistics", url: "/statistics"},
    ];

    return (
        <header className="header">
            <Logo type="header__logo"/>
            <Menu items={menuItems}/>
        </header>
    );
};

export default Header;