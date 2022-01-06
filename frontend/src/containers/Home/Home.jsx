import React from 'react';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { fromAirport as FromAirport, toAirport as ToAirport, checkIn as CheckIn, checkOut as CheckOut, findBtn as FindBtn } from '../../components/Inputs/Inputs';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {
    const test = () => {
        alert("hi")
    }
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
                        <FromAirport />
                        <ToAirport />
                        <CheckIn />
                        <CheckOut />
                        <FindBtn onClick={test} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;