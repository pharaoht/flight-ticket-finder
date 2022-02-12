import React, { useContext, useState } from 'react'
import './Ticket.css';
import moment from 'moment'
import airlines from 'airline-codes'
import { useEffect } from 'react';
import FlightContext from '../../Context/flight-context';

export default function Ticket(props) {
    console.log(props)
    const context = useContext(FlightContext);
    const [isHidden, setIsHidden] = useState(true);
    const [isHiddenReturn, setIsHiddenReturn] = useState(true);
    const [returnFlights, setReturnFlights] = useState();
    const [fromFlights, setFromFlights] = useState();
    const [isSelected, setIsSelected] = useState(false);
    let Fflights = []
    let Rflights = []

    const toFlight = () => {
        props.stops.map((item) => {
            if (item.return === 0) {
                return Fflights.push(item);
            }
            else {
                return Rflights.push(item);
            }
        })
        setFromFlights(Fflights);
        setReturnFlights(Rflights)
    }

    const returnFlight = () => {

        const stopComponentReturn = () => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px' }}>
                    {returnFlights.map(item => {
                        return (
                            <div key={item.id} className='tc-stop-icon'>{item.flyFrom} <ion-icon name="airplane-outline"></ion-icon> {item.flyTo} </div>
                        )
                    })}
                </div>
            )
        };

        const stopCheckReturn = (num) => {
            let stops;
            let number = num - 1
            num === 2 ? stops = 'Stop' : stops = 'Stops';

            return (
                num === 1 ? <><span style={{ color: 'green' }}>Non-Stop</span></> : <div onClick={() => show(1)} style={{ color: 'red' }}>{number} {stops}</div>
            )
        }

        const end = returnFlights.length - 1;

        return (
            <>
                <div className='tc-ticket-info'>
                    <div className='tc-img'>
                        <h4 className='tc-h4'>{getAirLineName(returnFlights[0].airline)}</h4>
                    </div>
                    <div className='tc-details'>
                        <div className='tc-detail-sec'>
                            <div className='tc-date'>{convertDate(returnFlights[0].local_departure)}</div>
                            <div className='tc-time'>{convertTime(returnFlights[0].local_departure)}</div>
                            <div className='tc-location'>{props.cityTo}</div>
                            <div className='tc-country'>{props.countryTo}</div>
                        </div>
                        <div className='tc-utl'>
                            <div className='tc-duration'>
                                <div>Duration</div>
                                <div>{convertSeconds(props.durationReturn)}</div>
                            </div>
                            <div className='tc-line'>
                                <hr className='tc-hr-1'></hr>
                                <div className='inline-block2'>
                                    <ion-icon name="stop-circle-outline"></ion-icon>
                                </div>
                                <div className='inline-block'>
                                    <ion-icon name="airplane-outline"></ion-icon>
                                </div>
                            </div>
                            <div className='tc-stops'>{returnFlights === undefined ? null : stopCheckReturn(returnFlights.length)}</div>
                        </div>

                        <div className='tc-detail-sec'>
                            <div className='tc-date'>{convertDate(returnFlights[end].local_arrival)}</div>
                            <div className='tc-time'>{convertTime(returnFlights[end].local_arrival)}</div>
                            <div className='tc-location'>{props.cityFrom}</div>
                            <div className='tc-country'>{props.countryFrom}</div>
                        </div>
                    </div>
                </div>
                {isHiddenReturn ? null : stopComponentReturn()}
            </>
        )
    }

    const fromFlight = () => {

        const stopCheck = (num) => {
            let stops;
            let number = num - 1
            num === 2 ? stops = 'Stop' : stops = 'Stops';

            return (
                num === 1 ? <><span style={{ color: 'green' }}>Non-Stop</span></> : <div onClick={show} style={{ color: 'red' }}>{number} {stops}</div>
            )
        }

        const stopComponent = () => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px' }}>
                    {fromFlights.map(item => {
                        return (
                            <div key={item.id} className='tc-stop-icon'>{item.flyFrom} <ion-icon name="airplane-outline"></ion-icon> {item.flyTo} </div>
                        )
                    })}
                </div>
            )
        };

        return (
            <>
                <div className='tc-ticket-info'>
                    <div className='tc-img'>
                        <h4 className='tc-h4'>{getAirLineName(props.airlines[0])}</h4>
                    </div>
                    <div className='tc-details'>
                        <div className='tc-detail-sec'>
                            <div className='tc-date'>{convertDate(props.depart)}</div>
                            <div className='tc-time'>{convertTime(props.depart)}</div>
                            <div className='tc-location'>{props.cityFrom}</div>
                            <div className='tc-country'>{props.countryFrom}</div>
                        </div>
                        <div className='tc-utl'>
                            <div className='tc-duration'>
                                <div>Duration</div>
                                <div>{convertSeconds(props.durationDepart)}</div>
                            </div>
                            <div className='tc-line'>
                                <hr className='tc-hr-1'></hr>
                                <div className='inline-block2'>
                                    <ion-icon name="stop-circle-outline"></ion-icon>
                                </div>
                                <div className='inline-block'>
                                    <ion-icon name="airplane-outline"></ion-icon>
                                </div>
                            </div>
                            <div className='tc-stops' >{fromFlights === undefined ? null : stopCheck(fromFlights.length)}</div>

                        </div>
                        <div className='tc-detail-sec'>
                            <div className='tc-date'>{convertDate(props.arrive)}</div>
                            <div className='tc-time'>{convertTime(props.arrive)}</div>
                            <div className='tc-location'>{props.cityTo}</div>
                            <div className='tc-country'>{props.countryTo}</div>
                        </div>
                    </div>
                </div>
                {isHidden ? null : stopComponent()}
            </>
        )
    }

    const show = (id) => {
        if (id === 1) {
            if (isHiddenReturn) {
                return setIsHiddenReturn(false)
            } else {
                return setIsHiddenReturn(true)
            }
        }

        if (isHidden) {
            return setIsHidden(false)
        } else {
            return setIsHidden(true)
        }

    };

    const getAirLineName = (iata) => {
        let name = airlines.findWhere({ iata: iata }).get('name');
        return name
    }

    const convertTime = (date) => {
        return moment(date).utc().format('hh:mm a')
    };

    const convertDate = (date) => {
        return moment(date).utc().format('ll')
    }

    const convertSeconds = (seconds) => {
        var convert = function (x) { return (x < 10) ? "0" + x : x; }
        const hours = convert(parseInt(seconds / (60 * 60)))
        const minutes = convert(parseInt(seconds / 60 % 60))

        return (
            <>
                <div>{hours} h {minutes} m</div>
            </>
        )
    }

    const changeSelected = (e) => {

        if (!isSelected) {

            if (context.selectedFlights.length === 3) {
                return false;
            }

            const flightDataObj = {
                id: props.type,
                airportCodeFrom: props.cityFrom,
                airportCodeTo: props.cityTo,
                price: props.price,
                totalDuration: Number(props.durationDepart + props.durationReturn),
                totalStops: Number(props.stops.length),
                bookingLink: props.link,
                countryFrom: props.countryFrom,
                countryTo: props.countryTo,
                departDate: convertDate(props.depart),
                departTime: convertTime(props.depart),
                arriveDate: convertDate(props.arrive),
                arriveTime: convertTime(props.arrive)
            }

            context.setData(flightDataObj)
            setIsSelected(prev => { return true })

        }
        else {
            const flightDataObj = { id: props.type };
            context.removeItem(flightDataObj);
            setIsSelected(prev => { return false })
        }
    };

    useEffect(() => {
        toFlight();
    }, [props.stops])

    useEffect(() => {

        const checkID = obj => obj.id === props.type;
        const isInside = context.selectedFlights.some(checkID);

        if (isInside && !isSelected) {
            setIsSelected(true)
        }
        else if (!isInside && isSelected) {
            setIsSelected(false)
        }
        else {
            return null
        }
    }, [context.selectedFlights.length])

    return (
        <div className='ticket-holder' key={props.type}>
            <div className='tc-flight-info'>
                {fromFlight()}
                <hr></hr>
                {returnFlights ? returnFlight() : null}
            </div>
            <div className='tc-price'>
                <div className='tc-compare'>
                    <div onClick={changeSelected} className='tc-add-btn'>
                        {!isSelected ? <ion-icon name="add-outline"></ion-icon> : <ion-icon name="checkmark-outline"></ion-icon>}
                    </div>
                </div>
                <div className='tc-deals '>
                    <div className='tc-tr-price'>${props.price}</div>
                    <div>
                        <button className='tc-button'>
                            <span>
                                <a target='_blank' rel="noreferrer" href={props.link}>Book</a>
                            </span>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
