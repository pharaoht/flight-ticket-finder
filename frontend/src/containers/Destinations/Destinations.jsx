import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import axios from 'axios';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);

    const obj = {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
        },
        body: '',
        url: 'https://tequila-api.kiwi.com/locations/topdestinations?term=london_gb&locale=en-US&limit=100&sort=name&active_only=true&source_popularity=searches',
    };

    const { isLoading, error, sendRequest } = useHttp(obj, setDestinations);

    const showDestinations = () => { return (destinations.map(item => { return (<div> {item.name} </div>) })) }

    useEffect(() => {
        sendRequest();
    }, []);

    return (
        <div>
            {destinations.length > 1 ? showDestinations() : null}
        </div>
    )
}

export default Destinations;

