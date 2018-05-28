import React, { Component } from 'react';
import './css/reset.css';
import './App.css';
import Main from './components/Main';
import Header from "./components/Header";
import ErrorModal from './components/ErrorModal';


class App extends Component {
    render() {
      return (
          <div>
            <Header/>
            <Main/>
            <ErrorModal/>
          </div>
      );
    }
}

export default App;