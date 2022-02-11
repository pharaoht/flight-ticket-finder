import React, { useRef, useEffect, useState } from 'react';
import Compare from './Filters/Compare/Compare';
import Departtimes from './Filters/DepartTimes/Departtimes';
import Duration from './Filters/Duration/Duration';
import SortBy from './Filters/SortBy/SortBy';
import StopOvers from './Filters/StopOvers/StopOvers';
import './SideBar.css';

export default function SideBar(props) {
    const [duration, setDuration] = useState(null);
    const [outBound, setOutBound] = useState(null);
    const [returnTime, setReturnTime] = useState(null);
    const sidebar = useRef();

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    //when dependent state changes, pass props to parent
    useEffect(() => {
        const timer = setTimeout(() => {
            liftStateDurationHandler();
        }, 500)
        return () => {
            clearTimeout(timer);
        };
    }, [duration, outBound, returnTime])

    //scoll class adder
    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 100 ? sidebar.current.classList.add('is-stick') : sidebar.current.classList.remove('is-stick');
    };
    //lift state handler to parent
    const liftStateDurationHandler = () => {
        const filterObj = {
            duration: duration,
            outBound: outBound,
            returnTime: returnTime
        }
        props.liftState(filterObj)
    };
    //lift state handler to child
    const durationSetter = (num) => {
        setDuration(prev => num)
    };
    //lift state handler to child
    const outBoundSetter = (time) => {
        setOutBound(prev => time);
    };
    //lift state handler to child
    const returnSetter = (time) => {
        setReturnTime(prev => time)
    };

    return (
        <div className='side-bar' ref={sidebar}>
            <StopOvers />
            <Duration durationAvg={props.durationAvg} liftState={durationSetter} />
            <Departtimes liftState={outBoundSetter} returnSetter={returnSetter} />
            <SortBy />
            <Compare />
        </div>
    )
};
