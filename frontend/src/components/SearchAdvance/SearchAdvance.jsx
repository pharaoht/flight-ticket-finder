import React, { useState } from 'react'
import BrowserRouter, { Link } from "react-router-dom";
import './SearchAdvance.css'

export default function SearchAdvance(props) {
    const lt = '<';
    const gt = '>';
    const [isShowing, setIsShowing] = useState(false);
    const [startDate, setStartDate] = useState(props.flightInfo.depart_date);
    const [returnDate, setReturnDate] = useState(props.flightInfo.return_date);

    const incrementDate = () => {
        //if date is change have to lift state up to flight compo
    };

    const decrementDAte = () => {
        //if date is change have to lift state up to flight compo
    };

    const showSearch = () => {
        if (isShowing) {
            setIsShowing(false)
        } else {
            setIsShowing(true)
        }
    };

    const searchSection = () => {
        return (
            <>
                <div className='search-form'>
                    hib
                </div>
            </>
        )
    };

    return (
        <div className='sd-main-search-container'>
            <div className='sd-seprator'>
                <div className='sd-holder'>
                    <div className='sd-srch-holder'>
                        <button className='sd-button' onClick={showSearch}><ion-icon id='sd-icon' name='search-outline'></ion-icon></button>
                    </div>
                    <div className='sd-airport-holder'>
                        <div>
                            <h2 className='sd-h2'>{props.flightInfo.from_airport}</h2>
                        </div>
                        <div><h2 className='sd-h2'>-</h2></div>
                        <div>
                            <h2 className='sd-h2'>{props.flightInfo.to_airport}</h2>
                        </div>
                    </div>
                </div>
                <div className='sd-holder sd-dates'>
                    <div className='sd-date'>
                        <div>{lt}</div>
                        <div>{startDate}</div>
                        <div>{gt}</div>
                    </div>
                    <div className='sd-date'>
                        <div>{lt}</div>
                        <div>{returnDate}</div>
                        <div>{gt}</div>
                    </div>
                </div>
            </div>
            {isShowing ? searchSection() : null}
        </div>
    )
}
