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
    console.log(params)
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState([]);

    const getFlights = () => {

        const from = params.from_airport;
        const destination = params.to_airport;
        //refactor later
        let departure_date = params.depart_date.replace('-', '/')
        let return_date = params.return_date.replace('-', '/')
        departure_date = departure_date.replace('-', '/')
        return_date = return_date.replace('-', '/')

        const URL = `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${destination}&dateFrom=${departure_date}&dateTo=${return_date}&curr=USD&locale=en`;

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
    };

    function loader() {
        return (
            <>
                <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div><ClipLoader color={'#4EF3D2'} loading={isLoading} size={150} /></div>
                </div>
            </>
        )
    };


    useEffect(() => {
        setIsLoading(true);
        getFlights();
        return () => {

        };
    }, []);

    return (
        <>
            {isLoading ? loader() :
                <div className='parent-ticket-container' style={{ outline: '1px solid black' }}>
                    <div className='fligh-edit-component' style={{ outline: '1px solid blue' }}>
                        <SearchAdvance flightInfo={params} />
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
            }
        </>
    )
}

