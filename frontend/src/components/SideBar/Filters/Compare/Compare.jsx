import React, { useContext, useEffect, useState } from 'react';
import FlightContext from '../../../../Context/flight-context';
import './Compare.css';
import Modals from '../../../Modal/Modals';


export default function Compare() {

    const context = useContext(FlightContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {

        if (!isModalOpen) {
            setIsModalOpen(true)
        }
        else {
            setIsModalOpen(false)
        }

    }

    const renderSelectedFlights = () => {
        return (
            context.selectedFlights.map((item) => {
                return (
                    <>
                        <div className='cp-select-holder' key={item.id}>
                            <div className='cp-icon' onClick={() => context.removeItem({ id: item.id })}>
                                <ion-icon name="close-outline"></ion-icon>
                            </div>
                            <div className='cp-brief-info'>
                                <div className='cp-info-flight'>{item.airportCodeFrom} to {item.airportCodeTo}</div>
                                <div className='cp-info-flight'> ${item.price}</div>
                                <div className='cp-info-flight'>{item.arriveDate}</div>
                            </div>
                        </div>
                    </>
                )
            })
        )
    }

    return (
        <div className='cp-parent'>
            <Modals isOpen={isModalOpen} onRequest={setIsModalOpen}></Modals>
            <div className='cp-header'>
                <div>
                    <h3>Compare Flights</h3>
                </div>
            </div>
            <div className='cp-holder'>
                <div className='cp-btn-holder'>
                    {context.selectedFlights.length < 3 ?
                        <button className='cp-compare-btn-disabled' disabled={true}>Compare</button> :
                        <button className='cp-compare-btn' onClick={openModal}>Compare</button>}
                </div>
                <div>
                    <p><b>{context.selectedFlights.length}</b> / 3 flights selected</p>
                </div>
                <div>
                    {context.selectedFlights.length >= 1 ? renderSelectedFlights() : null}
                </div>
            </div>
        </div >
    )
}
