import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import '../Navbar/Navbar.css'

export default function Navbar() {
    return (
        <>
            <header>
                <Link to='/' className='logo'>Travel</Link>
                <div className='group'>
                    <ul className='navigation'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/'>Destinations</Link></li>
                        <li><Link to='/'>Tips</Link></li>
                        <li><Link to='/'>NewsLetter</Link></li>
                    </ul>
                    <ul className='action'>
                        <li><Link to='/' ><ion-icon name='search-outline'></ion-icon></Link></li>
                        <li><Link to='/' ><ion-icon name='person-outline'></ion-icon></Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}
