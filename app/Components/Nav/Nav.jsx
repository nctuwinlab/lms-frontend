import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { routerMiddleware, push } from 'react-router-redux';

import { navHover, navLeave } from '../../Actions/action';


class Nav extends Component{
    render(){
        const { navStatus, navLeave } = this.props;
        let id = -1;
        for(let i=0; i<navStatus.length; i++){
            if(navStatus[i].status == 'cur'){
                id = i;
            }
        }
        return (
            <nav style={-1 != id ?{background: navStatus[id].color} : {}}>
                <ul onMouseLeave={navLeave}>
                {
                    navStatus.map(item => {
                        return (
                            <li key={item.id} >
                                <div className={`nav-bg ${item.status}`} 
                                 style={{
                                    background: `linear-gradient(to right, ${item.color}, transparent)`
                                 }}>
                                    <div className="nav-num">
                                        <span>0</span>
                                        <span>{item.id+1}</span>
                                    </div>
                                    <div className="nav-img"></div>
                                </div>

                                <div className="wrapper" onClick={this.props.push}
                                    onMouseEnter={e => {
                                    this.onMouseEnterHandler(e, item.id);
                                }}>
                                    <div>{item.name}</div>
                                </div>
                            </li>
                        );
                    })
                }
                </ul>
            </nav>
        );
    }

    onMouseEnterHandler(e, id){
        console.log(id);
        e.stopPropagation();
        this.props.navHover(id);
    }
}

const mapStateToProps = (state) => {
    return {
        navStatus: state.navStatus,
        routing: state.routing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navHover: (id)=>{
            dispatch(navHover(id));
        },
        navLeave: ()=>{
            console.log('leave');
            dispatch(navLeave());
        },
        push: () => {
            console.log('push');
            dispatch(push('/test'));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,    
)(Nav);
