import React, { useState } from 'react';
import './StopOvers.css';

export default function StopOvers() {

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
            <span className="so-icon"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }
    const showUpArrow = () => {
        return (
            <span className="so-icon"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    }
    const showStops = () => {
        return (
            <>
                <div className='so-stops'>
                    <ul>
                        <li><input type='checkbox' name='non-stop' /> <span>Non-Stop</span></li>
                        <li><input type='checkbox' name='one-stop' /> <span>1 Stop</span></li>
                        <li><input type='checkbox' name='two-stops' /> <span>+2 Stops</span></li>
                    </ul>
                </div>
            </>
        )
    };

    return (
        <div className='so-parent'>
            <div className='so-header'>
                <div>
                    <h3>Stopovers</h3>
                </div>
                <div className='so-collaspe'>
                    {!isHidden ? showDownArrow() : showUpArrow()}
                </div>
            </div>
            {!isHidden ? showStops() : null}
        </div >
    )
}
