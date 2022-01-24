import React, { useState } from 'react'
import './SortBy.css'

export default function SortBy() {

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
            <span className="sort-icon"> <ion-icon name="chevron-down-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

    const showUpArrow = () => {
        return (
            <span className="sort-icon"> <ion-icon name="chevron-up-outline" onClick={toggleHandler}></ion-icon></span>
        )
    };

    return (
        <div className='sort-parent'>
            <div className='sort-header'>
                <div>
                    <h3>Sort By</h3>
                </div>
                <div className='sort-collaspe'>
                    {isHidden ? showDownArrow() : showUpArrow()}
                </div>
            </div>
        </div>
    )
}
