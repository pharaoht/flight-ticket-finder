import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { fromAirport as FromAirport, toAirport as ToAirport, checkIn as CheckIn, checkOut as CheckOut, findBtn as FindBtn, fromLocations as FromLocation, toLocations as ToLocations } from '../../components/Inputs/Inputs';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {

    const [paramData, setParamData] = useState({
        from_airport: '',
        to_airport: '',
        departure: '',
        return: ''
    });

    const [fromLocation, setFromLocations] = useState([]);
    const [toLocation, setToLocations] = useState([]);
    const [eventValue, setEventValue] = useState('');
    const [changeValue, setChangeValue] = useState('');
    const fromInput = useRef();


    const locationAPIRequest = (location, val) => {
        console.log("location api")
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
                console.log(val)
                val === 1 ?
                    setFromLocations(res.data.locations) :
                    setToLocations(res.data.locations);
            })
            .catch(err => {
                console.log(err)
            });
    };


    const changeHandler = (event) => {

        event.target.name === 'from_airport' ?
            setChangeValue(1) :
            setChangeValue(2);

        setEventValue(prev => prev = event.target.value);
        setParamData({ ...paramData, [event.target.name]: event.target.value });
    };

    const populateText = () => {
        alert("hi");
    };

    function showFromLocations() {
        return (
            <div className='airport_holder'>
                <ul onClick={populateText}>
                    {fromLocation.map((itm, idx) => {

                        return (
                            <>
                                <FromLocation name={itm.name} id={itm.id} onClick={populateText} />
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
                                <ToLocations name={itm.name} id={itm.id} onClick={submitHandler} />
                            </>
                        )
                    })}
                </ul>
            </div>
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        alert("hi");
    };

    useEffect(() => {
        console.log("use effect")

        const timer = setTimeout(() => {
            console.log("time out")
            locationAPIRequest(eventValue, changeValue);
        }, 500)

        return () => {
            console.log("clean up")
            clearTimeout(timer)
        }
    }, [paramData])

    return (
        <>
            <div className='banner'>
                <div className='bg'>
                    <img src={photo1} className='cover' alt='cover' />
                    <div className='content'>
                        <h2>Explore the World</h2>
                        <span className='btn'><Link to='/'>Book Now</Link></span>
                    </div>
                    <div className='searchBox'>
                        <div>
                            {fromLocation.length > 1 ? showFromLocations() : null}

                            <FromAirport onChange={(e) => changeHandler(e)} />
                        </div>
                        <div>
                            {toLocation.length > 1 ? showToLocations() : null}
                            <ToAirport onChange={(e) => changeHandler(e)} />
                        </div>

                        <CheckIn onChange={changeHandler} />
                        <CheckOut onChange={changeHandler} />
                        <FindBtn onClick={submitHandler} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;