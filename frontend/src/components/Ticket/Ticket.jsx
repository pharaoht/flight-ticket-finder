import React from 'react'
import './Ticket.css';
export default function Ticket(props) {
    console.log(props)
    return (
        <div className='ticket-holder'>
            <div className='tc-flight-info'>
                <div className='tc-ticket-info'>
                    <div className='tc-img'>
                        <h2>{props.airlines[0]}</h2>
                    </div>
                    <div className='tc-details'>
                        <div className='tc-detail-sec'>
                            <div className='tc-time'>{props.depart}</div>
                            <div className='tc-location'>{props.cityfrom}</div>
                        </div>
                        <div>
                            <div className='tc-duration'></div>
                            <div className='tc-line'></div>
                            <div className='tc-stops'></div>
                        </div>
                        <div className='tc-detail-sec'>
                            <div className='tc-time'></div>
                            <div className='tc-location'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tc-price'>
                <div className='tc-deals'>
                    <div className='tc-price'></div>
                    <div><button>Select</button></div>
                </div>
            </div>
        </div>
    )
}
