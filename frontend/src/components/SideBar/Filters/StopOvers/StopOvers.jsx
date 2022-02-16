import React, { useState } from 'react';
import './StopOvers.css';

export default function StopOvers(props) {

    const [isHidden, setIsHidden] = useState(false);
    const [isDisabled, setIsDisabled] = useState(props.nonstop)

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

    const liftState = (e) => {
        if (e.target.name === 'non-stop') {
            if (!e.target.checked) {
                return false;
            }
            props.liftStateStops(2);
        }
        else if (e.target.name === 'one-stop') {
            if (e.target.checked === false) {
                props.liftStateStops(0);
            } else {
                props.liftStateStops(4);
            }
        } else {
            if (e.target.checked === false) {
                props.liftStateStops(0);
            }
            else {
                props.liftStateStops(5);
            }
        }
    };

    const showStops = () => {
        return (
            <>
                <div className='so-stops'>
                    <ul>
                        <li><input onClick={e => liftState(e)} type='checkbox' name='non-stop' disabled={isDisabled} /> <span>Non-Stop</span></li>
                        <li><input onClick={e => liftState(e)} type='checkbox' name='one-stop' /> <span>1 Stop</span></li>
                        <li><input onClick={e => liftState(e)} type='checkbox' name='two-stops' /> <span>+2 Stops</span></li>
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
