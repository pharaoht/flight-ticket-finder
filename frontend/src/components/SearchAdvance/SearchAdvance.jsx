import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import { FromAirport, ToAirport, CheckIn, CheckOut, Cabin, FindBtn, FromLocations, CabinDropDown, ToLocations } from '../Inputs/Inputs';
import { locationAPIRequest } from '../../Util/UtilMethods';
import './SearchAdvance.css'

export default function SearchAdvance(props) {
    const newStartDay = convertDay(props.flightInfo.depart_date)
    const newEndDay = convertDay(props.flightInfo.return_date)
    const [paramBuilder, SetParamBuilder] = useState({
        from_airport: '',
        to_airport: '',
        return: true,
        date_from: '',
        date_to: '',
        cabin: '',
        adults: '',
        children: '',
        infants: ''
    });
    const [isShowing, setIsShowing] = useState(false);
    const [isCabin, setIsCabin] = useState(false);
    const [startDate, setStartDate] = useState(new Date(newStartDay));
    const [returnDate, setReturnDate] = useState(new Date(newEndDay));
    const [fromDateInput, setFromDateInput] = useState();
    const [toDateInput, setToDateInput] = useState();
    const [fromLocation, setFromLocation] = useState([]);
    const [toLocation, setToLocation] = useState([]);
    const [eventValue, setEventValue] = useState();
    const [changeValue, setChangeValue] = useState();
    const [adults, setAdults] = useState(1);
    const [infants, setInfants] = useState(0);
    const [children, setChildren] = useState(0);
    const [liftState, setLiftState] = useState(false)
    const [cabinValue, setCabinValue] = useState(`${adults} Adult, ${children} Children, ${infants} Infants`);
    const fromInput = React.createRef();
    const toInput = React.createRef();
    const fromDateRef = React.createRef();
    const toDateRef = React.createRef();
    const header = useRef();

    const incrementDate = (isPast) => {
        if (isPast) {
            if (startDate.getTime() >= returnDate.getTime()) {
                return false;
            }
        }
        isPast ?
            setStartDate(prevState => new Date(prevState.getTime() + 1 * 24 * 60 * 60 * 1000)) :
            setReturnDate(prevState => new Date(prevState.getTime() + 1 * 24 * 60 * 60 * 1000));
        setLiftState(prev => { return true })
    };

    function convertDay(date) {
        const str = date.split('-')
        return `${str[1]}-${str[0]}-${str[2]}`
    }

    const decrementDate = (isPast) => {
        const now = new Date(Date.now());

        //check if date is in past
        if (isPast) {
            const dateInput = startDate.getTime();
            if (dateInput <= now) {
                return false;
            }
        }
        else {
            if (returnDate.getTime() <= startDate.getTime()) {
                return false;
            }
        }

        isPast ?
            setStartDate(prevState => new Date(prevState.getTime() - 1 * 24 * 60 * 60 * 1000)) :
            setReturnDate(prevState => new Date(prevState.getTime() - 1 * 24 * 60 * 60 * 1000));

        setLiftState(prev => { return true })
    };

    const showSearch = () => {
        if (isShowing) {
            setIsShowing(false)
            setFromLocation([])
        } else {
            setIsShowing(true)
        }
    };

    const showCabin = (e) => {
        if (e._reactName === 'onClick') {
            !isCabin && setIsCabin(true);
        }
        else if (e._reactName === 'onMouseLeave') {
            isCabin && setIsCabin(false);
        }
    }

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 100 ? header.current.classList.add('is-sticky') : header.current.classList.remove('is-sticky');
    };

    const changeHandler = (event) => {

        if (event.target.name === 'return') {
            return SetParamBuilder(prevState => { return { ...prevState, return: event.target.value } })
        }

        if (event.target.name === 'from_airport') {
            event.target.value === '' && SetParamBuilder((prevState) => { return { ...prevState, from_airport: '' } });
        }
        else {
            event.target.value === '' && SetParamBuilder((prevState) => { return { ...prevState, to_airport: '' } });
        }

        event.target.name === 'from_airport' ?
            setChangeValue(1) :
            setChangeValue(2);

        setEventValue(prev => prev = event.target.value);
    };

    const showFrom = () => {

        const populateFromInput = (country, airportId) => {
            fromInput.current.value = `${airportId} - ${country}`;
            setFromLocation([]);
            SetParamBuilder((prevState) => { return { ...prevState, from_airport: airportId } });
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
            SetParamBuilder((prevState) => { return { ...prevState, to_airport: airportId } });
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
        const total = 10;

        const incrementAdult = () => {

            if (adults + children + infants === total) {
                //add css disabled class
                return false
            }
            let count = adults + 1
            setAdults(prevState => { return prevState + 1 })
            SetParamBuilder(prevState => { return { ...prevState, adults: count } })
        };

        const decrementAdult = () => {
            if (adults === 1) {
                //add css disable to mius btn
                return false;
            }
            let count = adults - 1
            setAdults(prevState => { return prevState - 1 });
            SetParamBuilder(prevState => { return { ...prevState, adults: count } });
        };

        const incrementChild = () => {
            if (adults + children + infants === total) {
                //add css disabled class
                return false
            }
            let count = children + 1
            setChildren(prevState => { return prevState + 1 })
            SetParamBuilder(prevState => { return { ...prevState, children: count } });
        };

        const decrementChild = () => {
            if (children === 0) {

                //add css disable to mius btn
                return false
            };
            let count = children - 1
            setChildren(prevState => { return prevState - 1 })
            SetParamBuilder(prevState => { return { ...prevState, children: count } });
        };

        const incrementInfant = () => {
            if (adults + children + infants === total) {
                //add css disabled class
                return false
            }
            let count = infants + 1
            setInfants(prevState => { return prevState + 1 })
            SetParamBuilder(prevState => { return { ...prevState, infants: count } });
        }

        const decrementInfant = () => {
            if (infants === 0) {
                return false
            }
            let count = infants - 1
            setInfants(prevState => { return prevState - 1 })
            SetParamBuilder(prevState => { return { ...prevState, infants: count } });
        }

        return (
            <div>
                <div className='sd-travelers'>
                    <div className='sd-travel-type'>
                        <h4>Adults</h4>
                        <h6>Over 11</h6>
                    </div>
                    <div className='sd-number-of-travelers'>
                        <div onClick={decrementAdult}>
                            <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                        </div>
                        <div>
                            {adults}
                        </div>
                        <div onClick={incrementAdult}>
                            <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className='sd-travelers'>
                    <div className='sd-travel-type'>
                        <h4>Children</h4>
                        <h6>2 - 11</h6>
                    </div>
                    <div className='sd-number-of-travelers'>
                        <div onClick={decrementChild}>
                            <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                        </div>
                        <div>
                            {children}
                        </div>
                        <div onClick={incrementChild}>
                            <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
                <div className='sd-travelers'>
                    <div className='sd-travel-type'>
                        <h4>Infants</h4>
                        <h6>Under 2</h6>
                    </div>
                    <div className='sd-number-of-travelers'>
                        <div onClick={decrementInfant}>
                            <ion-icon id="sd-icon-minus-ad" name="remove-circle-outline"></ion-icon>
                        </div>
                        <div>
                            {infants}
                        </div>
                        <div onClick={incrementInfant}>
                            <ion-icon id='sd-icon-plus-ad' name="add-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    const cabinModule = () => {
        return (
            <>
                <div className='sd-ca-cl-tr' onMouseLeave={showCabin} >
                    {triangle()}
                    <div className='sd-dropdown-holder'>
                        <h5 className='sd-cab-title'>Cabin Class</h5>
                        <CabinDropDown />
                        {travelers()}
                        <h6>Max 10 passengers</h6>
                    </div>
                </div>
            </>
        )
    }

    const submitHandler = (e) => {
        e.preventDefault();
        return window.location.replace(`/tickets/${paramBuilder.from_airport}/${paramBuilder.to_airport}/${paramBuilder.date_from}/${paramBuilder.date_to}/`)
    }

    const formValidation = (e) => {
        let counter = 0
        paramBuilder.from_airport === '' ? fromInput.current.style.border = '1px solid red' : counter--
        paramBuilder.to_airport === '' ? toInput.current.style.border = '1px solid red' : counter--
        paramBuilder.date_from === '' ? fromDateRef.current.style.border = '1px solid red' : counter--
        paramBuilder.date_to === '' ? toDateRef.current.style.border = '1px solid red' : counter--

        if (counter !== -4) {
            return false
        }
        else {
            submitHandler(e);
        }
    }

    const searchSection = () => {
        const dateConversion = (date, isFormInput, event) => {
            let month = date.getMonth() + 1;
            const day = date.toLocaleString('en-US', { day: '2-digit' });
            const year = date.getFullYear();

            if (month < 10) {
                month = `0${month}`
            };

            if (isFormInput) {
                setFromDateInput(prevState => { return date })
                SetParamBuilder(prevState => { return { ...prevState, date_from: `${day}-${month}-${year}` } })
            }
            else {
                setToDateInput(prevState => { return date })
                SetParamBuilder(prevState => { return { ...prevState, date_to: `${day}-${month}-${year}` } })
            }
        }
        return (
            <>
                <div className='search-form'>
                    <div className='sd-search-return-type sd-spacing'>
                        <div>
                            <input id='sd-return-btn' type='radio' name='return' value='true' onClick={(e) => changeHandler(e)} />
                            <label className='sd-hover'>Return</label>
                        </div>
                        <div>
                            <input id='sd-oneway-btn' type='radio' name='return' value='false' onClick={(e) => changeHandler(e)} />
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
                            <CheckIn ref={fromDateRef} selected={fromDateInput} onChange={(date, event) => dateConversion(date, true, event)} />
                        </div>
                        <div className='sd-checks'>
                            <CheckOut ref={toDateRef} selected={toDateInput} onChange={(date, event) => dateConversion(date, false, event)} />
                        </div>
                        <div className='sd-cabin'>
                            <div className='sd-cabin-holder'>
                                <Cabin onClick={(e) => showCabin(e)} value={cabinValue} />
                                {!isCabin ? null : cabinModule()}
                            </div>
                            <div className='sd-find-btn'>
                                <FindBtn onClick={(e) => formValidation(e)} />
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
        let numOfAdults, numOfChild, numOfInfan

        adults === 1 ? numOfAdults = 'Adult' : numOfAdults = 'Adults';
        children === 1 ? numOfChild = 'Child' : numOfChild = 'Children';
        infants === 1 ? numOfInfan = 'Infant' : numOfInfan = 'Infants';

        setCabinValue(prevState => { return `${adults} ${numOfAdults}, ${children} ${numOfChild}, ${infants} ${numOfInfan}` })
    }, [adults, children, infants]);

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

    useEffect(() => {

        if (liftState) {
            const time = setTimeout(() => {
                props.refresh(startDate, returnDate);
                setLiftState(false)

            }, 500)
            return () => {
                clearTimeout(time)
            }
        };

    }, [startDate, returnDate])

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
                            <div className='sd-chev sd-hover' onClick={(e) => decrementDate(true)}><ion-icon name="chevron-back-outline"></ion-icon></div>
                            <div>{startDate.toDateString()}</div>
                            <div className='sd-chev sd-hover' onClick={(e) => incrementDate(true)}><ion-icon name="chevron-forward-outline"></ion-icon></div>
                        </div>
                        <div className='sd-date'>
                            <div className='sd-chev sd-hover' onClick={(e) => decrementDate(false)}><ion-icon name="chevron-back-outline"></ion-icon></div>
                            <div>{returnDate.toDateString()}</div>
                            <div className='sd-chev sd-hover' onClick={(e) => incrementDate(false)}><ion-icon name="chevron-forward-outline"></ion-icon></div>
                        </div>
                    </div>
                </div>
                {isShowing ? searchSection() : null}
            </div>
        </div>
    )
}