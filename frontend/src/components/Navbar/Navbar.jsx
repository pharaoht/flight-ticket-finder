import React from 'react';
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css'

export default function Navbar() {
    return (
        <>
            <header>
                <Link to='/' className='logo'>Travel</Link>
                <div className='group'>
                    <ul className='navigation'>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/destinations'><li>Destinations</li></Link>
                        <Link to='/'><li>Tips</li></Link>
                        <Link to='/'><li>NewsLetter</li></Link>
                    </ul>
                    <ul className='action'>
                        <Link to='/' ><li><ion-icon name='search-outline'></ion-icon></li></Link>
                        <Link to='/' ><li><ion-icon name='person-outline'></ion-icon></li></Link>
                    </ul>
                </div>
            </header>
        </>
    )
}
