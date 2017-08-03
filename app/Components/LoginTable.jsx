import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, border, form } from '../Actions/action';

class LoginTable extends Component{
    
    componentDidMount(){
        setTimeout(() => {
            this.props.formChange('in');
        }, 500);
    }

    render(){
        let { maskClass, labelClass, borderClass, inputMaskClass } = this.props.asideStatus;
        return (
            <form>
                {
                    borderClass.map((c) => {
                        return (
                            <div 
                                className={c}>
                            </div>)
                    })
                }
                <div className="login-input">
                    <label className={labelClass}>
                        <div className={maskClass}></div>
                        Username
                    </label>
                    <input  type="text" name="username" className={labelClass}/>
                    <div className={inputMaskClass}></div>
                </div>
                <div className="login-input">
                    <label className={labelClass}>
                        <div className={maskClass}></div>
                        Password
                    </label>
                    <input type="password" name="password" className={labelClass}/>
                    <div className={inputMaskClass}></div>
                </div>
                <a className="waves-effect waves-light btn" onClick={this.props.login}>
                    <i className="material-icons right">exit_to_app</i>
                    login
                </a>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        asideStatus:  state.asideStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => {
            e.preventDefault();
            dispatch(login());
        },
        formChange: (dir) => {
            dispatch(border(dir, ['left', 'top', 'right', 'bottom', 'middle']));
            dispatch(form(dir));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginTable);
