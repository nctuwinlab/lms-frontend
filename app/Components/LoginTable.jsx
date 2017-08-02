import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../Actions/action';

class LoginTable extends Component{
    render(){
        return (
            <form>
                <div className="login-input">
                    <input  />
                </div>
                <div className="login-input">
                    <input  />
                </div>
                <button onClick={this.props.login}>login</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => {
            e.preventDefault();
            dispatch(login());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginTable);
