import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Button, Container} from 'semantic-ui-react'

class Header extends Component {

    render() {
        // return (
        //     <header>
        //         <nav>
        //             <ul>
        //                 <li><NavLink to='/'>Home</NavLink></li>
        //                 <li><NavLink to='/login'>Login</NavLink></li>
        //                 <li><NavLink to='/signup'>Sign Up</NavLink></li>
        //             </ul>
        //         </nav>
        //     </header>
        // )
        return (
            <Menu secondary size='large'>
                <Container>
                    <Menu.Item ><NavLink className='menu_item' to='/'>Home</NavLink></Menu.Item>
                    <Menu.Item ><NavLink className='menu_item' to='/'>Lorem</NavLink></Menu.Item>
                    <Menu.Item ><NavLink className='menu_item' to='/'>Lorem</NavLink></Menu.Item>
                    <Menu.Item position='right'>
                       <NavLink to='/login'><Button basic size='small'>Login</Button></NavLink>
                       <NavLink to='/signup' style={{ marginLeft: '0.5em' }}><Button basic size='small'>Sign Up</Button></NavLink>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default Header;