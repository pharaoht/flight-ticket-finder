import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css'

export default function Navbar() {

    //getting state from redux store
    const isAuth = useSelector(state => state.isAuthenticated);

    return (
        <>
            <header>
                <Link to='/' className='logo'>Travel</Link>
                <div className='group' id='navbar'>
                    <ul className='navigation'>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/destinations'><li>Destinations</li></Link>
                        <Link to='/'><li>Tips</li></Link>
                        <Link to='/'><li>NewsLetter</li></Link>
                    </ul>
                    <ul className='action'>
                        <Link to='/' ><li><ion-icon name='search-outline'></ion-icon></li></Link>
                        {!isAuth && <Link to='/' ><li><ion-icon name='person-outline'></ion-icon></li></Link>}
                        {isAuth && <Link to='/'><li><ion-icon name="log-out-outline"></ion-icon></li></Link>}
                    </ul>
                </div>
            </header>
        </>
    )
}
