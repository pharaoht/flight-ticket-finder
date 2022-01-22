import React from 'react';
import Departtimes from './Filters/DepartTimes/Departtimes';
import Duration from './Filters/Duration/Duration';
import StopOvers from './Filters/StopOvers/StopOvers';
import './SideBar.css';

export default function SideBar() {
    return (
        <div className='side-bar'>
            <StopOvers />
            <Duration />
            <Departtimes />
        </div>
    )
};
