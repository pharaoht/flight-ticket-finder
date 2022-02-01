import React, { useEffect, useState } from 'react';
import Ticket from '../Ticket/Ticket';
import ClipLoader from "react-spinners/ClipLoader";
import './Main.css';

export default function Main(props) {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        setFlights(props.flights.data)
    }, [props])

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

    const noFlights = () => {
        return (
            <div>
                <h3>No Flights available</h3>
            </div>
        )
    };

    function loader() {
        return (
            <>
                <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div><ClipLoader color={'#4EF3D2'} loading={props.test} size={150} /></div>
                </div>
            </>
        )
    };


    return (
        <div className='main-holder'>
            {props.test ? loader() :
                flights.length > 1 ? showFlights() : noFlights()}
        </div>
    )
};
