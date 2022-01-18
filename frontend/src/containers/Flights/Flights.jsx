import React, { useEffect, useState } from 'react'
import Main from '../../components/Main/Main'
import SearchAdvance from '../../components/SearchAdvance/SearchAdvance'
import SideBar from '../../components/SideBar/SideBar'
import axios from 'axios'
import './Flights.css'

export default function Flights(props) {
    console.log(props)
    const [flights, setFlights] = useState([]);

    const getFlights = async () => {

        const from = props.flightParams.from_airport;
        const destination = props.flightParams.to_airport;
        const departure_date = props.flightParams.departure;
        const return_date = props.flightParams.return;

        const URL = `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${destination}&dateFrom=${departure_date}&dateTo=${return_date}&curr=USD`;

        const config = {
            headers: {
                "accept": "application/json",
                "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
            }
        };

        await axios.get(URL, config)
            .then((res) => {
                console.log(res)
                return setFlights(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    };


    useEffect(() => {

        getFlights();
        return () => {

        };
    }, []);

    return (
        <div className='parent-ticket-container' style={{ outline: '1px solid black' }}>
            <div className='fligh-edit-component' style={{ outline: '1px solid blue' }}>
                <SearchAdvance flightInfo={props} />
            </div>
            <div className='main-flight-info' style={{ outline: '1px solid red' }}>
                <div className='sidebar-component'>
                    <SideBar />
                </div>
                <div className='ticket-area'>
                    <Main flights={flights} />
                </div>
            </div>
        </div>
    )
}

