import React, { useState } from 'react';
import axios from 'axios';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { fromAirport as FromAirport, toAirport as ToAirport, checkIn as CheckIn, checkOut as CheckOut, findBtn as FindBtn } from '../../components/Inputs/Inputs';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {

    const [paramData, setParamData] = useState({
        from_airport: '',
        to_airport: '',
        departure: '',
        return: ''
    });

    const [locations, setLocations] = useState([])

    const locationAPIRequest = (location) => {
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
                setLocations(res.data.locations);
            })
            .catch(err => {
                console.log(err)
            });

    };

    const changeHandler = (event) => {
        console.log(event)
        setParamData({ ...paramData, [event.target.name]: event.target.value });

        if (event.target.name === '' || event.target.name === 'departure' || event.target.name === 'return') {
            return false;
        }
        else {
            locationAPIRequest(event.target.value);
        };
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