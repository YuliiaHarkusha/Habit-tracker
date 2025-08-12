import React from "react";
import "./_logo.scss"

import logo from "../../../../assets/logo.jpg";
const Logo = (props) => {
    return (
        <div className={props.type}>
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Logo;