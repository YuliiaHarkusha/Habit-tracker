import React from "react";
import { NavLink } from "react-router-dom";
import "./_menu.scss";

const Menu = ({ items }) => {
    return (
        <nav className="menu">
            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        <NavLink
                            to={item.url}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;