import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';


class App extends Component {

  render() {
    let location;
    switch (this.props.location.location) {
        case 'MAIN':
          location = <Main/>;
          break;
        case 'LOGIN':
          location = <Login/>;
          break;
        case 'SIGN_UP':
          location = <SignUp/>;
          break;
        default:
          location = <Login/>;
    }

    return (
      <div className="App">
          {location}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeLocation: (location) => {
//       dispatch(changeLocation(location));
//     }
//   }
// }

export default connect(mapStateToProps)(App);