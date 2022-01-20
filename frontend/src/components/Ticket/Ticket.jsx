import React, { useState } from 'react'
import './Ticket.css';
import moment from 'moment'
import airlines from 'airline-codes'

export default function Ticket(props) {
    console.log(props)

    const [isHidden, setIsHidden] = useState(true);

    const stopComponent = () => {
        return (
            <div style={{ outline: '1px solid red' }}>
                hi
            </div>
        )
    };

    const toFlight = () => {
        let count = 0;

    }

    const returnFlight = () => {

    }


    const show = () => {
        if (isHidden) {
            setIsHidden(false)
        } else {
            setIsHidden(true)
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

    const stopCheck = (num) => {
        return (

            num === 1 ? <><span style={{ color: 'green' }}>Non-Stop</span></> : <span style={{ color: 'red' }}>{num} stops</span>
        )
    }

    return (
        <div className='ticket-holder' key={props.type}>
            <div className='tc-flight-info'>
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
                                <div>{convertSeconds(props.duration)}</div>
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
                            <div className='tc-stops' onClick={show}>{stopCheck(props.stops.length)}</div>
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

            </div>
            <div className='tc-price'>
                <div className='tc-deals'>
                    <div className='tc-tr-price'>${props.price}</div>
                    <div><button className='tc-button'><span><a target='_blank' href={props.link}>Book</a></span><ion-icon name="arrow-forward-outline"></ion-icon></button></div>
                </div>
            </div>
        </div>
    )
}
