import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import { navHover, navLeave } from '../../Actions/action';
import { routeIn, routeOut, routeCh } from '../../Actions/action';


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
                                    backgroundImage: 
                                    `
                                    linear-gradient(to right, 
                                        ${item.color} 0%, 
                                        ${item.color} 20%, 
                                        transparent 100%),
                                    url(${item.image})`
                                 }}>
                                    <div className="nav-num">
                                        <span>0</span>
                                        <span>{item.id+1}</span>
                                    </div>
                                </div>

                                <div className="wrapper" 
                                    onClick={this.props.push.bind(this, id, this.props.routePath)}
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
        routePath: state.routePath,
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
        push: (id, routePath) => {
            if(id >=  routePath.routes.length){
                id = 0;
            }
            dispatch(routeCh(id));
            dispatch(navLeave());
            dispatch(routeOut());
            setTimeout(()=>{
                dispatch(push(routePath.routes[id].pathname));
                dispatch(routeIn());
            }, 500);
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,    
)(Nav));
