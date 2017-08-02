import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../Actions/action';

class LoginTable extends Component{
    render(){
        return (
            <button onClick={this.props.login}>login</button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(login());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginTable);
