import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asideToggle } from '../Actions/action'

import { Route, withRouter } from 'react-router-dom';

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
        
        console.log(this.props);
        return (
            <div>
                <Nav />
                <LoginForm />
                <section className={this.props.routeTransition}>
                    {
                        this.props.routePath.routes.map((route, index) => {
                            return 0 == index ? 
                            <Route exact key={index} path={route.pathname} component={route.component}/> :
                            <Route key={index} path={route.pathname} component={route.component}/>
                        })
                    }
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
        routeTransition: state.routeTransition,
        routePath: state.routePath,
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
