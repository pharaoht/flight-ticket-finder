import React from 'react';
import Ticket from '../Ticket/Ticket';

import './Main.css';

export default function Main(props) {
    console.log('hi')
    console.log(props)
    return (
        <div className='main-holder' style={{ outline: '2px solid purple' }}>
            <Ticket />
        </div>
    )
};
