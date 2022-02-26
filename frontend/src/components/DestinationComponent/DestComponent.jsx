import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import '../DestinationComponent/DestComponent.css';

const DestComponent = (props) => {
    const [photoLink, setphotoLink] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const location = `${props.name}, ${props.country}`

    const obj = {
        method: 'GET',
        redirect: 'follow',
        url: `https://api.unsplash.com/search/photos?query=${props.name}&per_page=1&orientation=portrait&page=1&client_id=cKakzKM1cx44BUYBnEIrrgN_gnGqt81UcE7GstJEils`
    };

    const fetchPhotos = async (obj) => {
        let link = await axios.get(obj.url, { method: obj.method, redirect: obj.redirect })
            .then(res => { return res.data.results[0].urls.full })
            .catch(err => { return console.log(err) });

        return link;
    };

    const loadHandler = () => {
        setIsLoaded(prev => true)
    };

    useEffect(async () => {
        const fetchData = async () => {
            let photo = await fetchPhotos(obj);
            setphotoLink(photo);
        };

        fetchData();
    }, []);

    return (
        <div className='dest-comp-holder' key={props.id}>
            <div className='dest-comp-photo'>
                <img className='img-dest' src={photoLink} onLoad={() => loadHandler()} alt='destination_photo' height='100%' width='200px' />
            </div>
            <div className='dest-comp-info'>
                <div className='dest-info-header'>
                    <h2>{location}</h2>
                </div>
                <div className='dest-comp-body'>
                    <div>
                        <h3>Information</h3>
                    </div>
                    <div className='dest-comp-sub-body'>
                        <div className='sub-body-container'>
                            <div className='sub-body-item'>1</div>
                            <div className='sub-body-item'>2</div>
                        </div>
                        <div className='sub-body-container'>
                            <div className='sub-body-item'>3</div>
                            <div className='sub-body-item'>4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DestComponent;
