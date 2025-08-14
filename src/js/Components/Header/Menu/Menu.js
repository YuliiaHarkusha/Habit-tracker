import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import menuIcon from "../../../../assets/menu.svg";
import "./_menu.scss";

const Menu = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <nav className="menu">
            <img
                src={menuIcon}
                alt="menu icon"
                className="menu__toggle--icon"
                onClick={toggleMenu}
            />
            <ul className="desktop-menu">
                {items.map((item, i) => (
                    <li key={i}>
                        <NavLink
                            to={item.url}
                            className={({ isActive }) => (isActive ? "active" : "")}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
                {items.map((item, i) => (
                    <li key={i}>
                        <NavLink
                            to={item.url}
                            className={({ isActive }) => (isActive ? "active" : "")}
                            onClick={() => setIsOpen(false)}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </nav>
    );
};
export default Menu;