import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import { Link } from "react-router-dom";
import { FromAirport, ToAirport, CheckIn, CheckOut, Cabin, FindBtn, FromLocations, CabinDropDown } from '../Inputs/Inputs';
import { locationAPIRequest } from '../../Util/UtilMethods';
import './SearchAdvance.css'

export default function SearchAdvance(props) {

    const [isShowing, setIsShowing] = useState(false);
    const [startDate, setStartDate] = useState(props.flightInfo.depart_date);
    const [returnDate, setReturnDate] = useState(props.flightInfo.return_date);
    const [fromLoco, setFromLoco] = useState();
    const [to, setTo] = useState();
    const header = useRef();

    const incrementDate = () => {
        let dayArr = startDate.split('-');
        let day = Number(dayArr[0]) + 1
        let month = Number(dayArr[1])
        let year = Number(dayArr[2])


    };

    const decrementDate = () => {
        //if date is change have to lift state up to flight compo
    };

    const showSearch = () => {
        if (isShowing) {
            setIsShowing(false)
        } else {
            setIsShowing(true)
        }
    };

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 100 ? header.current.classList.add('is-sticky') : header.current.classList.remove('is-sticky');
    };

    const searchSection = () => {
        return (
            <>
                <div className='search-form'>
                    <div className='sd-search-return-type sd-spacing'>
                        <div>
                            <input id='sd-return-btn' type='radio' name='return' value='return' />
                            <label className='sd-hover'>Return</label>
                        </div>
                        <div>
                            <input id='sd-oneway-btn' type='radio' name='return' value='oneway' />
                            <label className='sd-hover'>One-way</label>
                        </div>
                    </div>
                    <div className='sd-from-to-airport sd-spacing'>
                        <div className='sd-airport'>
                            <FromAirport />

                        </div>
                        <div className='sd-airport'>
                            <ToAirport />
                        </div>
                    </div>
                    <div className='sd-dates-travel sd-spacing'>
                        <div className='sd-checks'>
                            <CheckIn />
                        </div>
                        <div className='sd-checks'>
                            <CheckOut />
                        </div>
                        <div className='sd-cabin'>
                            <div>
                                <Cabin />
                            </div>
                            <div className='sd-find-btn'>
                                <FindBtn />
                            </div>
                        </div>

                    </div>

                </div>
            </>
        )
    };

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, [])

    useEffect(() => {
        async function fetechData() {
            let places;
            places = await locationAPIRequest();
            setFromLoco(places);
        }

        fetechData();
    }, [])

    return (
        <div className='header-section' >
            <div className='sd-main-search-container' ref={header}>
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
                            <div className='sd-chev sd-hover' onClick={decrementDate}><ion-icon name="chevron-back-outline"></ion-icon></div>
                            <div>{startDate}</div>
                            <div className='sd-chev sd-hover' onClick={incrementDate}><ion-icon name="chevron-forward-outline"></ion-icon></div>
                        </div>
                        <div className='sd-date'>
                            <div className='sd-chev sd-hover' onClick={decrementDate}><ion-icon name="chevron-back-outline"></ion-icon></div>
                            <div>{returnDate}</div>
                            <div className='sd-chev sd-hover' onClick={incrementDate}><ion-icon name="chevron-forward-outline"></ion-icon></div>
                        </div>
                    </div>
                </div>
                {isShowing ? searchSection() : null}
            </div>
        </div>
    )
}
