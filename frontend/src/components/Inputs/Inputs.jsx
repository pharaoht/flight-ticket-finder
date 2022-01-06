import React from 'react'
import '../Inputs/Inputs.css';

export const fromAirport = () => {
    return (
        <div className='inputBx'>
            <p>From:</p>
            <input type="text" placeholder="JFK, MIA, LAX" />
        </div>
    );
};

export const toAirport = () => {
    return (
        <div className='inputBx'>
            <p>To:</p>
            <input type="text" placeholder="JFK, MIA, LAX" />
        </div>
    );
};

export const checkIn = () => {
    return (
        <div className='inputBx'>
            <p>Departure</p>
            <input type='date' />
        </div>
    );
};

export const checkOut = () => {
    return (
        <div className='inputBx'>
            <p>Return</p>
            <input type='date' />
        </div>
    );
};

export const findBtn = ({ onClick }) => {
    return (
        <div className='inputBx'>
            <p className='white'>_</p>
            <input type='Submit' value="Find" onClick={onClick} />
        </div>
    );
};