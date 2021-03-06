import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginFormBg from './LoginFormBg.jsx';
import LoginTable from './LoginTable.jsx';

class LoginForm extends Component{
    render(){
        const { asideClass, firstOpened, firstOpenedAnime } = this.props.loginFormStatus;
        const { isLogin } = this.props;
        return (
            <aside className={asideClass}>
                {
                    firstOpened?<LoginFormBg />:null
                }
                {
                    firstOpenedAnime?<LoginTable />:null
                }
            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginFormStatus: state.loginFormStatus,
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

