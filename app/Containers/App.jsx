import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clickEvt } from '../Actions/action'

import List from '../Components/List.jsx';

class App extends Component{
    render(){
        const { clickEvt, items } = this.props;
        return (
            <div>
                <List items={items}/>               
                <button onClick={clickEvt}>click</button>
            </div>
        );    
    }
}

const mapStateToProps = (state) => {
    console.log('state to props', state);
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clickEvt: () => {
            dispatch(clickEvt('REDUX RRRRR'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
