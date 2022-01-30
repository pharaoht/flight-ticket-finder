import React from 'react';
import { useState } from 'react';
import RangeSlider from '../../../Slider/Slider';
import './Duration.css';

export default function Duration(props) {

    const [isHidden, setIsHidden] = useState(false);
    const [maxDuration, setMaxduration] = useState()

    const toggleHandler = () => {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true)
        }
    };

    const showDownArrow = () => {
        return (
            <span className="dr-icon"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

    const showUpArrow = () => {
        return (
            <span className="dr-icon"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

    function convertSec(sec) {
        var convert = function (x) { return (x < 10) ? "0" + x : x; }
        let hours = convert(parseInt(sec / (60 * 60)));
        hours = Number(hours)
        return hours;
    }

    const showSlider = () => {
        return (
            <>
                <div className='dr-time-head'>
                    <h4>{convertSec(props.durationAvg[0])} hours</h4>
                    <div className='dr-light'>to</div>
                    <h4>{maxDuration === undefined ? convertSec(props.durationAvg[1]) : maxDuration} hours</h4>
                </div>
                <div>
                    <RangeSlider
                        start={convertSec(props.durationAvg[0])}
                        end={convertSec(props.durationAvg[1])}
                        updateDuration={updateMaxDuration}
                        savedMax={maxDuration}
                        single={true}
                    />
                </div>
            </>
        )
    }

    const updateMaxDuration = (limit) => {
        setMaxduration(limit);
    }

    return (
        <div className='dr-parent'>
            <div className='dr-header'>
                <div>
                    <h3>Duration</h3>
                </div>
                <div className='dr-collaspe'>
                    {isHidden ? showDownArrow() : showUpArrow()}
                </div>
            </div>
            <div className='dr-slider-holder'>
                {isHidden ? showSlider() : null}
            </div>
        </div>
    )
}
