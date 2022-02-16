import React, { useState } from 'react';
import { useEffect } from 'react';
import './StopOvers.css';

export default function StopOvers(props) {
    console.log(props)
    const [isHidden, setIsHidden] = useState(false);
    const [isDisabled, setIsDisabled] = useState(props.nonstop);
    const [checked, setChecked] = useState('checked');

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
        if (e.target.id === 'non-stop') {
            props.liftStateStops(2);
        }
        else if (e.target.id === '1-stop') {
            props.liftStateStops(4);
            setChecked(prev => '');
        }
        else if (e.target.id === '2-stops') {
            props.liftStateStops(5);
            setChecked(prev => '');
        }
        else {
            props.liftStateStops(0);
            setChecked(prev => 'checked');
        }
    };

    const showStops = () => {
        return (
            <>
                <div className='so-stops'>
                    <ul className='so-ul-stops'>
                        <li>
                            <label className='so-labels'>
                                <input className='so-input' onChange={e => liftState(e)} type='radio' name='stops' id='non-stop' disabled={isDisabled} />Non-Stop
                            </label>
                        </li>
                        <li>
                            <label>
                                <input className='so-input' onChange={e => liftState(e)} type='radio' name='stops' id='1-stop' />1 Stop
                            </label>
                        </li>
                        <li>
                            <label>
                                <input className='so-input' onChange={e => liftState(e)} type='radio' name='stops' id='2-stops' />+2 Stops
                            </label>
                        </li>
                        <li>
                            <label>
                                <input className='so-input' onChange={e => liftState(e)} type='radio' name='stops' id='all-stops' />All
                            </label>
                        </li>
                    </ul>
                </div>
            </>
        )
    };

    useEffect(() => {
        setIsDisabled(prev => props.nonstop)
    }, [props.nonstop]);

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
