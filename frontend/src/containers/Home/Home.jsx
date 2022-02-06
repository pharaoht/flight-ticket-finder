import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { FromAirport, ToAirport, CheckIn, CheckOut, FindBtn, FromLocations, ToLocations } from '../../components/Inputs/Inputs';
import BrowserRouter, { Link, } from "react-router-dom";

export default function Home(props) {

    const [paramData, setParamData] = useState({
        from_airport: '',
        to_airport: '',
        departure: '',
        return: ''
    });
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [fromLocation, setFromLocations] = useState([]);
    const [toLocation, setToLocations] = useState([]);
    const [eventValue, setEventValue] = useState('');
    const [changeValue, setChangeValue] = useState('');
    const fromInput = React.createRef();
    const toInput = React.createRef();
    const dateInputCN = React.createRef();
    const dateInputCO = React.createRef();


    const locationAPIRequest = (location, val) => {

        if (location === '') {
            setFromLocations([]);
            setToLocations([]);
            return false;
        };

        const url_1 = 'https://tequila-api.kiwi.com/locations/query?term=';
        const url_2 = '&locale=en-US&location_types=airport&limit=10&active_only=true';

        const config = {
            headers: {
                "accept": "application/json",
                "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
            }
        };

        axios.get(`${url_1}${location}${url_2}`, config)
            .then(res => {
                console.log(res)
                val === 1 ?
                    setFromLocations(res.data.locations) :
                    setToLocations(res.data.locations);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const changeHandler = (event) => {

        // formValidator(event, 'change');

        if (event.target.value === '') {

            event.target.name === 'from_airport' ?
                setParamData({ ...paramData, from_airport: '' }) :
                setParamData({ ...paramData, to_airport: '' });
        }

        event.target.name === 'from_airport' ?
            setChangeValue(1) :
            setChangeValue(2);

        setEventValue(prev => prev = event.target.value);
    };

    const populateText = (country, airportId) => {
        fromInput.current.value = `${airportId} - ${country} `;
        setParamData((prevState) => { return { ...prevState, from_airport: airportId } });
        setFromLocations([]);
    };

    const populateToInput = (country, airportId) => {
        toInput.current.value = `${airportId} - ${country} `;
        setParamData((prevState) => { return { ...prevState, to_airport: airportId } });
        setToLocations([]);
    };

    function showFromLocations() {
        return (
            <div className='airport_holder'>
                <ul>
                    {fromLocation.map((itm, idx) => {
                        return (
                            <>
                                <FromLocations name={itm.name} id={itm.id} onClick={(e) => populateText(itm.city.country.name, itm.id)} />
                            </>
                        )
                    })}
                </ul>
            </div>
        );
    };

    function showToLocations() {
        return (
            <div className='airport_holder'>
                <ul>
                    {toLocation.map((itm, idx) => {
                        return (
                            <>
                                <ToLocations
                                    name={itm.name}
                                    id={itm.id}
                                    onClick={(e) => populateToInput(itm.city.country.name, itm.id)}
                                />
                            </>
                        )
                    })}
                </ul>
            </div>
        );
    };

    const formValidator = (event, type, bool) => {

        if (type === 'change') {

            if (event.target.name === 'from_airport') {
                if (fromInput.current.style.border === '1px solid red') {
                    fromInput.current.style.border = '1px solid black'
                }
            }

            if (event.target.name === 'to_airport') {
                if (toInput.current.style.border === '1px solid red') {
                    toInput.current.style.border = '1px solid black'
                }
            }

            if (bool) {
                if (dateInputCN.current.input.style.border = '1px solid red') {
                    dateInputCN.current.input.style.border = '1px solid black'
                }
            }
            else {
                if (dateInputCO.current.input.style.border = '1px solid red') {
                    dateInputCO.current.input.style.border = '1px solid black'
                }
            }
        }
        else {
            let tracker = 0;

            paramData.from_airport === '' ?
                fromInput.current.style.border = '1px solid red' :
                tracker--;

            paramData.to_airport === '' ?
                toInput.current.style.border = '1px solid red' :
                tracker--;

            paramData.departure === '' ?
                dateInputCN.current.input.style.border = '1px solid red' :
                tracker--;

            paramData.return === '' ?
                dateInputCO.current.input.style.border = '1px solid red' :
                tracker--;

            if (tracker === -4) {
                return true;
            }
            else {
                return false;
            };
        }

    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isFormOK = formValidator('submit');

        if (isFormOK) {
            return window.location.replace(`/tickets/${paramData.from_airport}/${paramData.to_airport}/${paramData.departure}/${paramData.return}/`)
        }
        else {
            return false;
        };

    };


    const dateConversion = (date, isFromInput, event) => {
        let month = date.getMonth() + 1;
        const day = date.toLocaleString('en-US', { day: '2-digit' });
        const year = date.getFullYear();
        formValidator(event, 'change', isFromInput);

        if (month < 10) {
            month = `0${month}`
        };

        if (isFromInput) {
            setDepartDate(date);
            setParamData((prevState) => { return { ...prevState, departure: `${day}-${month}-${year}` } })
        } else {
            setReturnDate(date);
            setParamData((prevState) => { return { ...prevState, return: `${day}-${month}-${year}` } })
        };
    };

    useEffect(() => {

        const timer = setTimeout(() => {
            locationAPIRequest(eventValue, changeValue);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [eventValue]);

    return (
        <>
            <div className='banner'>
                <div className='bg'>
                    <img src={photo1} className='cover' alt='cover' />
                    <div className='content'>
                        <h2>Explore the World</h2>
                        <span className='btn'><Link to='/tickets'>Book Now</Link></span>
                    </div>
                    <div className='searchBox'>
                        <div>
                            {fromLocation.length > 1 ? showFromLocations() : null}
                            <FromAirport onChange={(e) => changeHandler(e)} ref={fromInput} />
                        </div>
                        <div>
                            {toLocation.length > 1 ? showToLocations() : null}
                            <ToAirport onChange={(e) => changeHandler(e)} ref={toInput} />
                        </div>
                        <div>
                            <CheckIn ref={dateInputCN} selected={departDate} onChange={(date, event) => dateConversion(date, true, event)} />
                        </div>
                        <div>
                            <CheckOut ref={dateInputCO} selected={returnDate} onChange={(date, event) => dateConversion(date, false, event)} />
                        </div>
                        <FindBtn onClick={submitHandler} />
                    </div>
                </div>
            </div>
        </>
    );
};
