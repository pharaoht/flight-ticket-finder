import React, { useEffect, useState } from 'react';
import Ticket from '../Ticket/Ticket';

import './Main.css';

export default function Main(props) {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        setFlights(props.flights.data)
    }, [])

    const showFlights = () => {
        return (
            flights.map((item, idx) => {
                return (
                    <Ticket cityFrom={item.cityCodeFrom}
                        cityTo={item.cityCodeTo}
                        depart={item.local_departure}
                        arrive={item.local_arrival}
                        price={item.price}
                        link={item.deep_link}
                        stops={item.route}
                        type={item.id}
                        airlines={item.airlines}
                        countryFrom={item.countryFrom.name}
                        countryTo={item.countryTo.name}
                        durationDepart={item.duration.departure}
                        durationReturn={item.duration.return}
                    />
                )
            })
        )
    }

    const observer = new IntersectionObserver(entries => {
        console.log(entries);
    })

    const noFlights = () => {
        return (
            <div>
                <h3>No Flights available</h3>
            </div>
        )
    }

    return (
        <div className='main-holder'>
            {flights.length > 1 ? showFlights() : noFlights()}
        </div>
    )
};
