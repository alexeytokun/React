import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    render() {
        return (
            <div>
                <p className="login_text">
                    <NavLink to="/login">LOGIN</NavLink>
                </p>
                <p className="login_text">
                    <NavLink to="/signup">SIGN UP</NavLink>
                </p>
            </div>
        )
    }

}

export default Home;