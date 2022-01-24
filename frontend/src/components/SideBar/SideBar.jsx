import React, { useRef, useEffect } from 'react';
import Departtimes from './Filters/DepartTimes/Departtimes';
import Duration from './Filters/Duration/Duration';
import SortBy from './Filters/SortBy/SortBy';
import StopOvers from './Filters/StopOvers/StopOvers';
import './SideBar.css';

export default function SideBar() {

    const sidebar = useRef()

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 100 ? sidebar.current.classList.add('is-stick') : sidebar.current.classList.remove('is-stick');
    };

    return (
        <div className='side-bar' ref={sidebar}>
            <StopOvers />
            <Duration />
            <Departtimes />
            <SortBy />
        </div>
    )
};
