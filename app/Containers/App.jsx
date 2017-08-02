import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clickEvt, asideToggle } from '../Actions/action'

import List from '../Components/List.jsx';
import LoginForm from '../Components/LoginForm.jsx';

class App extends Component{
    render(){
        const { clickEvt, asideToggle, items, 
            asideStatus: { 
                asideClass, 
                firstOpened,
                firstOpenedAnime
            }
        } = this.props;
        return (
            <div>
                <List items={items}/>
                <LoginForm />
                <button className="btn-floating btn-large waves-effect waves-light red login-btn" 
                    onClick={asideToggle}>click</button>
            </div>
        );    
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        asideStatus: state.asideStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickEvt: () => {
            dispatch(clickEvt('REDUX RRRRR HAHA'));
        },
        asideToggle: ()=>{
            dispatch(asideToggle());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
