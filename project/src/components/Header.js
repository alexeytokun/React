import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signup'>Sign Up</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;