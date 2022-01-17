import React from 'react'
import Main from '../../components/Main/Main'
import SearchAdvance from '../../components/SearchAdvance/SearchAdvance'
import SideBar from '../../components/SideBar/SideBar'
import './Flights.css'

export default function Flights(props) {

    return (
        <div className='parent-ticket-container' style={{ outline: '1px solid black' }}>
            <div className='fligh-edit-component' style={{ outline: '1px solid blue' }}>
                <SearchAdvance />
            </div>
            <div className='main-flight-info' style={{ outline: '1px solid red' }}>
                <div className='sidebar-component'>
                    <SideBar />
                </div>
                <div className='ticket-area'>
                    <Main />
                </div>
            </div>
        </div>
    )
}

