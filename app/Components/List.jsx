import React, { Component, PropTypes } from 'react';

const List = ({items}) => (
    <div>
        {
            items.map(item => {
                return (<div>{item.text}</div>);
            })
        }
    </div>    
);

export default List;
