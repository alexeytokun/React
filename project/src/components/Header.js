import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Button, Container, Dropdown} from 'semantic-ui-react'

class Header extends Component {

    render() {
        return (
            <Menu secondary size='large'>
                <Container>
                    <Menu.Item><NavLink className='menu_item' to='/'>Home</NavLink></Menu.Item>
                    <Menu.Item >
                        <Dropdown text='Categories' labeled button icon='archive'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Category 1</Dropdown.Item>
                                <Dropdown.Item>Category 2</Dropdown.Item>
                                <Dropdown.Item>Category 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item >
                        <Dropdown text='User' labeled button icon='user'>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to='/lot'>Add Lot</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/lots/:id'>Your Lots</Dropdown.Item>
                                <Dropdown.Item as={NavLink} to='/user/:id'>Edit Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item position='right'>
                       <NavLink to='/login' ><Button basic size='small'>Login</Button></NavLink>
                       <NavLink to='/signup' style={{ marginLeft: '0.5em' }}><Button basic size='small'>Sign Up</Button></NavLink>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default Header;