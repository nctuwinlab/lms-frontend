import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, pending, border, form } from '../../Actions/action';

class LoginTable extends Component{
    
    componentDidMount(){
        setTimeout(() => {
            this.props.formChange('in');
        }, 500);
    }

    render(){
        let { maskClass, labelClass, borderClass, inputMaskClass } = this.props.loginFormStatus;
        return (
            <form>
                {
                    borderClass.map((c, i) => {
                        return (
                            <div 
                                className={c}
                                key={i}
                            >
                            </div>)
                    })
                }
                <div className="login-input">
                    <label className={labelClass}>
                        <div className={maskClass}></div>
                        Username
                    </label>
                    <input  type="text" name="username" className={labelClass} required />
                    <div className={inputMaskClass}></div>
                </div>
                <div className="login-input">
                    <label className={labelClass}>
                        <div className={maskClass}></div>
                        Password
                    </label>
                    <input type="password" name="password" className={labelClass} required />
                    <div className={inputMaskClass}></div>
                </div>
                {   'false' != this.props.isLogin ? null :
                    <a className="waves-effect waves-light btn teal darken-4" onClick={this.props.login}>
                        <i className="material-icons right">exit_to_app</i>
                        login
                    </a>
                }
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginFormStatus:  state.loginFormStatus,
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => {
            e.preventDefault();
            dispatch(border('out', ['left', 'top', 'right', 'bottom', 'middle']));
            dispatch(form('out'));
            dispatch(pending());

            setTimeout(()=>{
                dispatch(login());
            }, 2000);
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
