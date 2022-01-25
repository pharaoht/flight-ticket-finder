import React, { useState } from 'react'
import './DepartTimes.css'

export default function Departtimes() {
    const [isHidden, setIsHidden] = useState(false);

    const toggleHandler = () => {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true)
        }
    };

    const showDownArrow = () => {
        return (
            <span className="so-icon so-hover"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }
    const showUpArrow = () => {
        return (
            <span className="so-icon so-hover"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }

    return (
        <div className='dt-parent'>
            <div className='dt-header'>
                <div>
                    <h3>Departure Times</h3>
                </div>
                <div className='dt-collaspe'>
                    {!isHidden ? showDownArrow() : showUpArrow()}
                </div>
            </div>
        </div >
    )
};
