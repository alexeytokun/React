import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Button, Container, Dropdown, Image } from 'semantic-ui-react';
import logo from "../logo-new.svg";
import { connect } from 'react-redux';
import {userLogOut} from "../actions/userActions";
import {saveLotsAndCategories} from "../actions/lotsActions";
import ErrorModal from "./ErrorModal";
import {updateLots} from '../functions';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentWillMount() {
        updateLots(this);
    }

    onModalClose() {
        this.setState({error: null});
    }

    render() {
        const link = this.props.loggedIn ?
            <NavLink to='/'><Button onClick={this.props.userLogOut} basic size='small'>Log Out</Button></NavLink> :
            <NavLink to='/login'><Button basic size='small'>Login</Button></NavLink> ;

        const categories = this.props.categories;
        let categoriesDropdownData;
        if (categories) {
            categoriesDropdownData = categories.map((category, i) => {
                return <Dropdown.Item as={NavLink} to={'/category/' + i} key={i}>{category.category_name}</Dropdown.Item>
            });
        }

        return (
            <Menu secondary size='large'>
                <ErrorModal error={this.state.error} onClose={this.onModalClose}/>
                <Container>
                    <Menu.Item><Image size='tiny' centered src={logo}/></Menu.Item>
                    <Menu.Item><NavLink className='menu_item' to='/'>Home</NavLink></Menu.Item>
                    <Menu.Item >
                        <Dropdown text='Categories' labeled button icon='archive'>
                            <Dropdown.Menu>
                                {categoriesDropdownData}</Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    {
                        this.props.loggedIn &&
                        <Menu.Item>
                            <Dropdown text='User' labeled button icon='user'>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={NavLink} to='/lot'>Add Lot</Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to='/lots/user'>Your Lots</Dropdown.Item>
                                    <Dropdown.Item as={NavLink} to='/user/:id'>Edit Profile</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    }
                    <Menu.Item position='right'>
                        {link}
                       <NavLink to='/signup' style={{ marginLeft: '0.5em' }}><Button basic size='small'>Sign Up</Button></NavLink>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.user.loggedIn,
        categories: state.lots.categories,
        lots: state.lots.lots,
        sortedLots: state.lots.sortedLots
    };
};

const dispatchStateToProps = (dispatch) => {
    return {
        userLogOut: () => dispatch(userLogOut()),
        saveLotsAndCategories: userdata => dispatch(saveLotsAndCategories(userdata))
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Header);