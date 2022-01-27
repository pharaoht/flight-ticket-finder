import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import { FromAirport, ToAirport, CheckIn, CheckOut, Cabin, FindBtn, FromLocations, CabinDropDown, ToLocations } from '../Inputs/Inputs';
import { locationAPIRequest } from '../../Util/UtilMethods';
import './SearchAdvance.css'

export default function SearchAdvance(props) {
    const [paramBuilder, SetParamBuilder] = useState({
        from_airport: '',
        to_airport: '',
        return: true,
        date_from: '',
        date_to: '',
        cabin: '',
        adults: 1,
        children: '',
        infants: ''
    });
    const [isShowing, setIsShowing] = useState(false);
    const [startDate, setStartDate] = useState(props.flightInfo.depart_date);
    const [returnDate, setReturnDate] = useState(props.flightInfo.return_date);
    const [fromLocation, setFromLocation] = useState([]);
    const [toLocation, setToLocation] = useState([]);
    const [eventValue, setEventValue] = useState();
    const [changeValue, setChangeValue] = useState();
    const fromInput = React.createRef();
    const toInput = React.createRef();
    const header = useRef();

    const incrementDate = () => {


    };

    const decrementDate = () => {
        //if date is change have to lift state up to flight compo
    };

    const showSearch = () => {
        if (isShowing) {
            setIsShowing(false)
            setFromLocation([])
        } else {
            setIsShowing(true)
        }
    };

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 100 ? header.current.classList.add('is-sticky') : header.current.classList.remove('is-sticky');
    };

    const changeHandler = (event) => {

        event.target.name === 'from_airport' ?
            setChangeValue(1) :
            setChangeValue(2);

        setEventValue(prev => prev = event.target.value);
    };

    const showFrom = () => {

        const populateFromInput = (country, airportId) => {
            fromInput.current.value = `${airportId} - ${country}`;
            setFromLocation([]);
        };

        return (
            <div className='sd-location-holder'>
                <ul>
                    {fromLocation.map((itm, idx) => {
                        return (
                            <>
                                <FromLocations name={itm.name} id={itm.id} onClick={(e) => populateFromInput(itm.city.country.name, itm.id)} />
                            </>
                        )
                    })}
                </ul>
            </div>
        );
    }

    const showTo = () => {

        const populateToInput = (country, airportId) => {
            toInput.current.value = `${airportId} - ${country}`;
            setToLocation([]);
        };

        return (
            <div className='sd-location-holder'>
                <ul>
                    {toLocation.map((itm, idx) => {
                        return (
                            <>
                                <ToLocations name={itm.name} id={itm.id} onClick={(e) => populateToInput(itm.city.country.name, itm.id)}
                                />
                            </>
                        )
                    })}
                </ul>
            </div>
        );
    }

    const triangle = () => {
        return (
            <div className="arrow-up"></div>
        )
    };

    const travelers = () => {
        return (
            <div>
                <div className='sd-adults'>
                    adults
                </div>
                <div className='sd-children'>
                    children
                </div>
                <div className='sd-infants'>
                    infants
                </div>
            </div>
        )

    }

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
                            <FromAirport onChange={(e) => changeHandler(e)} ref={fromInput} />
                            <div className='sd-li-pad'>
                                {fromLocation.length < 1 ? null : triangle()}
                                {fromLocation.length < 1 ? null : showFrom()}
                            </div>
                        </div>
                        <div className='sd-airport'>
                            <ToAirport onChange={(e) => changeHandler(e)} ref={toInput} />
                            <div className='sd-li-pad'>
                                {toLocation.length < 1 ? null : triangle()}
                                {toLocation.length < 1 ? null : showTo()}
                            </div>
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
                                <div className='sd-ca-cl-tr'>
                                    {triangle()}
                                    <div className='sd-dropdown-holder'>
                                        <p className='sd-cab-title'>Cabin Class</p>
                                        <CabinDropDown />
                                        {travelers()}
                                    </div>
                                </div>
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

    const formValidation = () => {

    }

    const submitHandler = () => {
        alert('hi')
    }

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, [])

    useEffect(() => {

        const timer = setTimeout(async () => {
            let data = await locationAPIRequest(eventValue, changeValue);

            changeValue === 1 ?
                setFromLocation(data) :
                setToLocation(data);

        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [eventValue])

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
