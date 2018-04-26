import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

        this.onLinkClick = this.onLinkClick.bind(this);
    }

    onLinkClick(e) {
        this.props.changeLocation(e.target.dataset.location);
    }

    render() {
        return (
            <div>
                <p className="login_text">
                    <a data-location="LOGIN" onClick={this.onLinkClick}>LOGIN</a>
                </p>
                <p className="login_text">
                    <a data-location="SIGN_UP" onClick={this.onLinkClick}>SIGN UP</a>
                </p>
            </div>
        )
    }

}

export default Home;