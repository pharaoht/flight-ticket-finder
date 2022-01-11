import React, { useState } from 'react';
import axios from 'axios';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { fromAirport as FromAirport, toAirport as ToAirport, checkIn as CheckIn, checkOut as CheckOut, findBtn as FindBtn } from '../../components/Inputs/Inputs';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {

    const URL = 'https://tequila-api.kiwi.com/v2/search?';

    const URL2 = 'https://tequila-api.kiwi.com/';

    const token = '';

    const [paramData, setParamData] = useState({
        from_airport: '',
        to_airport: '',
        departure: '',
        return: ''
    });

    const locationAPIRequest = () => {

    };

    const changeHandler = (event) => {

        setParamData({ ...paramData, [event.target.name]: event.target.value });
    };

    const paramBuilder = () => {
        let paramUrl = `${URL}`;


    };

    const submitHandler = (e) => {
        e.preventDefault();
        alert("hi");
    };

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
                        <FromAirport onChange={(e) => changeHandler(e)} />
                        <ToAirport onChange={changeHandler} />
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