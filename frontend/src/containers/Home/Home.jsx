import React from 'react';
import '../Home/Home.css';
import photo1 from '../../photos/bg.jpg';
import { BrowserRouter as Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <div className='banner'>
                <div className='bg'>
                    <img src={photo1} className='cover' alt='cover' />
                    <div className='content'>
                        <h2>Explore the World</h2>
                        <span className='btn'><Link to='/'>Book Now</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;