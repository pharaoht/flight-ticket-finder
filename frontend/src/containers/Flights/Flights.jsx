import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../components/Main/Main'
import SearchAdvance from '../../components/SearchAdvance/SearchAdvance'
import ClipLoader from "react-spinners/ClipLoader";
import SideBar from '../../components/SideBar/SideBar'
import axios from 'axios'
import moment from 'moment';
import './Flights.css'


export default function Flights() {
    //the main purpose of this component is to handle the flight state and pass the state down to its children
    //Should the flights state be a useContext? props chains are becoming long
    //use Context will be a centralized place to 
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState([]);
    const [flights2, setFlights2] = useState([]);
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
                setFlights(res.data.data);
                setFlights2(res.data.data)
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

    const filterSetter = (obj) => {
        let timer;
        let filtFlights;
        clearTimeout(timer)
        setTest(true)
        let seconds = (obj.duration * 60) * 60;

        filtFlights = flights2.filter(item => {
            if (seconds === 0) {
                return item
            } else {
                return item.duration.total <= seconds
            }
        }).filter(item => {
            if (obj.outBound === null) {
                return item
            } else {
                const start = obj.outBound[0];
                const end = obj.outBound[1];
                const departure = Number(moment(item.local_departure).utc().format('HH'));

                if (departure >= start && departure <= end) {
                    return item
                }
            }
        });

        setFlights(prevState => { return filtFlights })
        timer = setTimeout(() => {
            setTest(false)
        }, 500)

    }

    function page() {
        return (
            <div className='parent-ticket-container'>
                <div className='fligh-edit-component'>
                    <SearchAdvance flightInfo={params} refresh={getNewFlights} />
                </div>
                <div className='main-flight-info'>
                    <div className='sidebar-component'>
                        <div className='sidebar-total'>
                            <span><b>{flights.length}</b> Total flights avaiable</span>
                        </div>
                        <SideBar durationAvg={duration} liftState={filterSetter} />
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

