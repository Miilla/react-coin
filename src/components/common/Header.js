import React from 'react';
import logo from './logo.png'

const Header = () => {
    return (
        <div className="Header">
            <img src={logo} alt="logo" className="Header-logo"/>
        </div>
    )
}

export default Header;