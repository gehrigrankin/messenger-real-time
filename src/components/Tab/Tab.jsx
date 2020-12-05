import React from 'react'

import './Tab.scss';

const Tab = (props) => {
    return (
        <div 
            className={`Tab ${props.activeTab === props.position ? 'active' : ''}`}
            style={{float: props.position}}
            onClick={() => props.toggleTab(props.position)}
        >
            <p>
                {
                    props.user ? 
                        props.user.name : 
                        `User ${props.position === 'left' ? '1' : '2'}`
                }
            </p>
        </div>
    )
}

export default Tab;
