import React, { useState, useContext } from 'react';
import FlightContext from '../../../../Context/flight-context';
import './Compare.css';

export default function Compare() {

    const context = useContext(FlightContext);

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
                    <p>{context.selectedFlights.length} / 3 flights selected</p>
                </div>
            </div>
        </div >
    )
}
