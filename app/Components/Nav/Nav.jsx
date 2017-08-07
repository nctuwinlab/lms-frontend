import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { navHover } from '../../Actions/action';

class Nav extends Component{
    render(){
        const { navStatus } = this.props;
        let id = 0;
        for(let i=0; i<navStatus.length; i++){
            if(navStatus[i].status == 'cur'){
                id = i;
            }
        }
        return (
            <nav style={{background: navStatus[id].color}}>
                {
                    navStatus.map(item => {
                        return (
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
                        )
                    })
                }
                <ul>
                {
                    navStatus.map(item => {
                        return (
                            <li key={item.id} >

                                <div className="wrapper"
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navHover: (id)=>{
            dispatch(navHover(id));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,    
)(Nav);
