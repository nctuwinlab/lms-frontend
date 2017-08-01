import React, { Component, PropTypes } from 'react';

export default class LoginForm extends Component{
    render(){
        return (
            <aside className={this.props.asideClass}>
                <canvas id="text" width="500" height="100"></canvas>
                <canvas id="stage" width="500" height="100"></canvas>
            </aside>
        )
    }
}
