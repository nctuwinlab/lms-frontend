import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clickEvt, asideToggle } from '../Actions/action'

import List from '../Components/List.jsx';
import LoginForm from '../Components/LoginForm.jsx';

class App extends Component{
    render(){
        const { clickEvt, asideOut, items, asideStatus: {asideClass} } = this.props;
        return (
            <div>
                <List items={items}/>
                <LoginForm asideClass={asideClass}/>
                <button className="btn-floating btn-large waves-effect waves-light red login-btn" 
                    onClick={asideOut}>click</button>
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
        asideOut: ()=>{
            dispatch(asideToggle());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
