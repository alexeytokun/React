import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import EditUser from "./EditUser";
import AddLot from "./AddLot";
import LotPage from "./LotPage";

class Main extends Component {

    render() {
        return (
            <main className='main'>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/user/:id' component={EditUser}/>
                    <Route path='/lot' component={AddLot}/>
                    <Route path='/lot/:id' component={LotPage}/>
                </Switch>
            </main>
        );
    }
}

export default Main;