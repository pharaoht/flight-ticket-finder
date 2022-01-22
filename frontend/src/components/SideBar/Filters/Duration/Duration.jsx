import React from 'react';
import { useState } from 'react';
import './Duration.css';

export default function Duration() {

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
            <span className="dr-icon"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

    const showUpArrow = () => {
        return (
            <span className="dr-icon"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

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
        </div>
    )
}
