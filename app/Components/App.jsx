import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asideToggle } from '../Actions/action'

import { Route, withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
                <section>
                    <Route path="/test" render={(props) =>{
                        return <div>fuck this world</div>
                    }} />
                </section>
                <button className="btn-floating btn-large waves-effect waves-light red login-btn" 
                    onClick={asideToggle}>login</button>
            </div>
        );    
    }
}

const mapStateToProps = (state) => {
    return {
        loginFormStatus: state.loginFormStatus,
        routing: state.routing
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
