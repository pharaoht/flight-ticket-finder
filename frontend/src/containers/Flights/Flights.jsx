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
    const [nonStopFlights, setNonStopFlights] = useState(true);
    const [dates, setDates] = useState({});

    const getFlights = useCallback((sdate, edate) => {

        const queryString = window.location.search;
        const from = params.from_airport, destination = params.to_airport;
        let URL = '';

        const config = {
            headers: {
                "accept": "application/json",
                "apikey": "SLxN9_Q0EiAp-Lr7hLb-efLH7T1bIlOd"
            }
        };

        if (queryString) {
            let params = queryString.split('/');
            console.log(params)
        }
        let departure_date, return_date;


        if (sdate) {
            departure_date = convertDay(sdate);
            return_date = convertDay(edate);
        } else {
            departure_date = convertDay(params.depart_date);
            return_date = convertDay(params.return_date)
        }

        URL = `https://tequila-api.kiwi.com/v2/search?fly_from=${from}&fly_to=${destination}&dateFrom=${departure_date}&dateTo=${departure_date}&return_to=${return_date}&return_from=${return_date}&vehicle_type=aircraft&dtime_from=0:00&dtime_to=24:00&atime_from=0:00&atime_to=24:00&ret_dtime_from=0:00&ret_dtime_to=24:00&ret_atime_from=0:00&ret_atime_to=24:00&curr=USD&locale=en&limit=50`;

        axios.get(URL, config)
            .then((res) => {
                console.log(res);
                setNonStopFlights(true);
                setFlights(res.data.data);
                setFlights2(res.data.data);
                getDurationsAvg(res.data.data);
                checkNonStop(res.data.data);
                setTest(false)
                return setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setTest(false)
                return setIsLoading(false);
            });
    }, [params.depart_date, params.from_airport, params.to_airport, params.return_date]);

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
                return item;
            }
            else {
                if (item.duration.total < minimum) {
                    minimum = item.duration.total;
                }
                if (item.duration.total > maximum) {
                    maximum = item.duration.total
                }
                return item;
            }
        })
        setDuration(prevState => { return [minimum, maximum] })
        return true;
    }

    function loader() {
        return (
            <>
                <div style={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 40 }}>
                    <div><ClipLoader color={'#4EF3D2'} loading={isLoading} size={150} /></div>
                </div>
            </>
        )
    };

    function getNewFlights(startDate, returnDate) {

        setDates(prev => { return { sdate: startDate, edate: returnDate } })
    };

    const checkNonStop = (flight) => {
        let isNonStop = false;
        flight.map((item) => {
            if (isNonStop) {
                return false;
            }
            if (item.route.length <= 2) {
                console.log(item.route.length)
                setNonStopFlights(false);
                return isNonStop = true
            };
            return false;
        });

    };

    const filterSetter = (obj) => {

        if (obj.duration === null && obj.outBound === null && obj.returnTime === null && obj.stopOvers === null) {
            return false
        }

        let timer;
        let filtFlights;
        clearTimeout(timer)
        setTest(true)
        let seconds = (obj.duration * 60) * 60;

        filtFlights = flights2.filter(item => {
            if (seconds === 0) {
                return item;
            }
            else {
                return item.duration.total <= seconds;
            }

        }).filter(item => {
            if (obj.stopOvers === null || obj.stopOvers === 0) {
                return item
            } else {
                if (obj.stopOvers === 5) {
                    if (item.route.length >= obj.stopOvers) {
                        return item
                    }
                }
                else if (item.route.length <= obj.stopOvers) {
                    return item;
                }
                return false;
            }
        }).filter(item => {
            if (obj.outBound === null) {
                return item;
            } else {
                const start = obj.outBound[0];
                const end = obj.outBound[1];
                const departure = Number(moment(item.local_departure).utc().format('HH'));

                if (departure >= start && departure <= end) {
                    return item;
                }
                return false;
            }
        }).filter(item => {
            if (obj.returnTime === null) {
                return item;
            }
            else {
                const lastRoute = item.route.length - 1;
                const time = item.route[lastRoute].local_arrival;
                const returnTime = Number(moment(time).utc().format('HH'));
                const start = obj.returnTime[0];
                const end = obj.returnTime[1];

                if (returnTime >= start && returnTime <= end) {
                    return item;
                }
                return false;
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
                        <SideBar durationAvg={duration} liftState={filterSetter} nonStop={nonStopFlights} />
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
    }, []);

    useEffect(() => {
        setTest(true);
        getFlights(dates.sdate, dates.edate);

    }, [dates])


    return (
        <>
            {isLoading === undefined && loader()}
            {isLoading ? loader() : page()}
        </>
    )
}

