import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import axios from 'axios';
import '../Destinations/Destinations.css';
import DestComponent from '../../components/DestinationComponent/DestComponent';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [change, setChange] = useState(false);

    const obj = {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
        },
        body: '',
        url: 'https://tequila-api.kiwi.com/locations/topdestinations?term=london_gb&locale=en-US&limit=10&sort=name&active_only=true&source_popularity=searches',
    };

    const getPhotos = async () => {

        let arr = []
        await fetchPhotos();
        let newDest = combineLinks();
        setDestinations(newDest);

        async function fetchPhotos(obj) {
            let link;
            for (let i = 0; i < destinations.length; i++) {
                const obj = {
                    method: 'GET',
                    redirect: 'follow',
                    url: `https://api.unsplash.com/search/photos?query=${destinations[i].name}&per_page=1&orientation=portrait&page=1&client_id=cKakzKM1cx44BUYBnEIrrgN_gnGqt81UcE7GstJEils`
                };

                link = await axios.get(obj.url, { method: obj.method, redirect: obj.redirect })
                    .then(res => { return res.data.results[0].urls.full })
                    .catch(err => { return console.log(err) });
                arr.push(link)
            }
        }

        function combineLinks() {
            return destinations.map((itm, idx) => {
                itm['photo'] = arr[idx]
                return itm;
            });
        };

    };

    const { isLoading, error, sendRequest } = useHttp(obj, setDestinations);

    const showDestinations = () => { return (destinations.map(item => { return (<div key={item.id}> {item.name} <img src={item.photo} alt='photo' weight='100px' height='100px' /> </div>) })) }

    useEffect(async () => {
        await sendRequest();
        setChange(true);
    }, []);

    useEffect(() => {
        getPhotos()
    }, [change])

    return (
        <div className='destination-parent'>
            <div className='destination-header'>
                <h1>Top 10 Destinations</h1>
            </div>
            <div>
                <DestComponent />
            </div>
        </div>
    )
}

export default Destinations;


