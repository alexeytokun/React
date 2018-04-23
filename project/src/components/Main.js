import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeLocation } from '../actions/locationActions';

class Main extends Component {
    constructor(props) {
        super(props);

        this.onLinkClick = this.onLinkClick.bind(this);
    }

    // handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value });
    // }

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

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation: (location) => {
            dispatch(changeLocation(location));
        }
    }
}

export default connect(null, mapDispatchToProps)(Main);