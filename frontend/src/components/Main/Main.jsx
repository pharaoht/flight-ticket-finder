import React, { useEffect, useState } from 'react';
import Ticket from '../Ticket/Ticket';

import './Main.css';

export default function Main(props) {
    let flights = []

    const showFlights = () => {
        return (
            flights.map((item, idx) => {
                if (idx > 11) {
                    return null;
                }
                return (
                    <Ticket cityfrom={item.cityCodeFrom}
                        cityTo={item.cityCodeTo}
                        depart={item.local_departure}
                        arrive={item.local_arrival}
                        price={item.price}
                        link={item.deep_link}
                        stops={item.route}
                        key={`${idx}1`}
                        airlines={item.airlines}
                    />
                )
            })
        )
    }

    const noFlights = () => {
        return (
            <div>
                <h3>No Flights available</h3>
            </div>
        )
    }

    return (
        <div className='main-holder' style={{ outline: '2px solid purple' }}>
            {flights.length > 1 ? showFlights() : noFlights()}
        </div>
    )
};
