import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../components/Main/Main'
import SearchAdvance from '../../components/SearchAdvance/SearchAdvance'
import ClipLoader from "react-spinners/ClipLoader";
import SideBar from '../../components/SideBar/SideBar'
import axios from 'axios'
import moment from 'moment';
import './Flights.css'


export default function Flights() {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState([]);
    const [duration, setDuration] = useState([]);
    const [test, setTest] = useState(false);

    const getFlights = useCallback((sdate, edate) => {
        let departure_date, return_date;
        const from = params.from_airport, destination = params.to_airport;

        if (sdate) {
            departure_date = convertDay(sdate);
            return_date = convertDay(edate);
        } else {
            departure_date = convertDay(params.depart_date);
            return_date = convertDay(params.return_date)
        }

        const URL = `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${destination}&dateFrom=${departure_date}&dateTo=${departure_date}&return_to=${return_date}&return_from=${return_date}&vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00&curr=USD&locale=en&limit=50`;

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
                getDurationsAvg(res.data.data);
                setTest(false)
                return setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setTest(false)
                return setIsLoading(false);
            });
    }, []);

    function convertDay(date) {
        if (typeof date === 'object') {
            let newDate = moment(date).format('L').split('/');
            return `${newDate[1]}/${newDate[0]}/${newDate[2]}`
        }
        else if (typeof date === 'string') {
            let newDate = date.split('-');
            return `${newDate[0]}/${newDate[1]}/${newDate[2]}`
        }
    }

    function getDurationsAvg(arr) {
        let minimum;
        let maximum;
        arr.map((item, idx) => {
            if (idx === 0) {
                minimum = item.duration.total;
                maximum = item.duration.total;
            }
            else {
                if (item.duration.total < minimum) {
                    minimum = item.duration.total;
                }
                if (item.duration.total > maximum) {
                    maximum = item.duration.total
                }
            }
        })
        setDuration(prevState => { return [minimum, maximum] })
        return true;
    }

    function loader() {
        return (
            <>
                <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div><ClipLoader color={'#4EF3D2'} loading={isLoading} size={150} /></div>
                </div>
            </>
        )
    };

    function getNewFlights(startDate, returnDate) {
        setTest(true)
        getFlights(startDate, returnDate);
    };

    const durationFilter = () => {
        let duration = 1000;
        const arr = flights.map((item) => {

        });
    }

    function page() {
        return (
            <div className='parent-ticket-container'>
                <div className='fligh-edit-component'>
                    <SearchAdvance flightInfo={params} refresh={getNewFlights} />
                </div>
                <div className='main-flight-info'>
                    <div className='sidebar-component'>
                        <SideBar durationAvg={duration} />
                    </div>
                    <div className='ticket-area'>
                        <Main flights={flights} test={test} />
                    </div>
                </div>
            </div>
        )
    };

    useEffect(() => {
        setIsLoading(true);
        getFlights();

    }, [getFlights]);



    return (
        <>
            {isLoading === undefined && null}
            {isLoading ? loader() : page()}
        </>
    )
}

