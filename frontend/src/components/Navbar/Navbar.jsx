import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css'

const Navbar = () => {
    return (
        <>
            <header>
                <Link to='/' className='logo'>Travel</Link>
                <div className='group'>
                    <ul className='navigation'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/'>Destinations</Link></li>
                        <li><Link to='/'>About</Link></li>
                        <li><Link to='/'>Contact</Link></li>
                    </ul>
                    <ul className='action'>
                        <li><Link to='/'><icon-icon name='search-outline'></icon-icon></Link></li>
                        <li><Link to='/'><icon-icon name='person-outline'></icon-icon></Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Navbar;