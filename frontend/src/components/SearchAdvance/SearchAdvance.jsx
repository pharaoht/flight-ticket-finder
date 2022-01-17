import React from 'react'
import BrowserRouter, { Link } from "react-router-dom";
import './SearchAdvance.css'

export default function SearchAdvance(props) {
    return (
        <div className='sd-main-search-container'>
            <div className='sd-holder'>
                <div className='sd-srch-holder'>
                    <Link to='/' ><ion-icon name='search-outline'></ion-icon></Link>
                </div>
                <div>from Airport - To Airport

                </div>
            </div>
            <div className='sd-holder'>
                <div>
                    Start Date
                </div>
                <div>
                    End Date
                </div>
            </div>
        </div>
    )
}
