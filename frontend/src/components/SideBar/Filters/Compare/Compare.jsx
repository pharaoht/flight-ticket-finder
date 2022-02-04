import React, { useState } from 'react';
import './Compare.css';

export default function Compare() {

    const [comparedFlights, setComparedFlights] = useState([]);
    const [count, setCount] = useState(0);

    return (
        <div className='cp-parent'>
            <div className='cp-header'>
                <div>
                    <h3>Compare Flights</h3>
                </div>
            </div>
            <div className='cp-holder'>
                <div>
                    <button>Compare</button>
                </div>
                <div>
                    0/3 Flights
                </div>
            </div>
        </div >
    )
}
