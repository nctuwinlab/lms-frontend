import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asideToggle } from '../Actions/action'

import LoginForm from './Login/LoginForm.jsx';
import Nav from './Nav/Nav.jsx';

class App extends Component{
    render(){
        const { asideToggle, 
            loginFormStatus: { 
                asideClass, 
                firstOpened,
                firstOpenedAnime
            }
        } = this.props;
        return (
            <div>
                <Nav />
                <LoginForm />
                <button className="btn-floating btn-large waves-effect waves-light red login-btn" 
                    onClick={asideToggle}>click</button>
            </div>
        );    
    }
}

const mapStateToProps = (state) => {
    return {
        loginFormStatus: state.loginFormStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        asideToggle: ()=>{
            dispatch(asideToggle());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
