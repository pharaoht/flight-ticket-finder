import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import axios from 'axios';
import '../Destinations/Destinations.css';
import DestComponent from '../../components/DestinationComponent/DestComponent';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);

    const obj = {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
        },
        body: '',
        url: 'https://tequila-api.kiwi.com/locations/topdestinations?term=london_gb&locale=en-US&limit=10&sort=name&active_only=true&source_popularity=searches',
    };

    const { isLoading, error, sendRequest } = useHttp(obj, setDestinations);

    const showDestinations = () => {
        return (
            destinations.map(item => {
                return (
                    <DestComponent key={item.id} name={item.name} country={item.country.name} population={item.population} tags={item.tags} />
                )
            })
        )
    }

    useEffect(async () => {
        sendRequest();
    }, []);

    return (
        <div className='destination-parent'>
            <div className='destination-header'>
                <h1>Top 10 Destinations</h1>
            </div>
            <div className='destination-holder'>
                {destinations.length > 1 ? showDestinations() : <div>No destinations...</div>}
            </div>

        </div>
    )
}

export default Destinations;


