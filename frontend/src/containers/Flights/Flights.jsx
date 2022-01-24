import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../components/Main/Main'
import SearchAdvance from '../../components/SearchAdvance/SearchAdvance'
import ClipLoader from "react-spinners/ClipLoader";
import SideBar from '../../components/SideBar/SideBar'
import axios from 'axios'
import './Flights.css'

export default function Flights() {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState([]);

    const getFlights = useCallback(() => {

        const from = params.from_airport;
        const destination = params.to_airport;
        //refactor later
        let departure_date = params.depart_date.replace('-', '/')
        let return_date = params.return_date.replace('-', '/')
        departure_date = departure_date.replace('-', '/')
        return_date = return_date.replace('-', '/')

        const URL = `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${destination}&dateFrom=${departure_date}&dateTo=${departure_date}&return_to=${return_date}&return_from=${return_date}&vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00&curr=USD&locale=en&limit=15`;

        const config = {
            headers: {
                "accept": "application/json",
                "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
            }
        };

        axios.get(URL, config)
            .then((res) => {
                console.log(res)
                setFlights(res.data);
                return setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                return setIsLoading(false);
            });
    }, []);

    function loader() {
        return (
            <>
                <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div><ClipLoader color={'#4EF3D2'} loading={isLoading} size={150} /></div>
                </div>
            </>
        )
    };

    function page() {
        return (
            <div className='parent-ticket-container'>
                <div className='fligh-edit-component'>
                    <SearchAdvance flightInfo={params} />
                </div>
                <div className='main-flight-info'>
                    <div className='sidebar-component'>
                        <SideBar />
                    </div>
                    <div className='ticket-area'>
                        <Main flights={flights} />
                    </div>
                </div>
            </div>
        )
    };

    useEffect(() => {
        setIsLoading(true);
        getFlights();
        return () => {

        };
    }, [getFlights]);

    return (
        <>
            {isLoading ? loader() : page()}
        </>
    )
}

