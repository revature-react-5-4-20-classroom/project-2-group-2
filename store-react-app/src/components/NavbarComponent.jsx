import React from 'react';
import { Link } from 'react-router-dom'
 const NavbarComponent = ()=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping</Link>
                    
                    <ul className="right">
                        <li><Link to="/view">Shop</Link></li>
                        <li><Link to="/myprofile">My Profile</Link></li>
                        <li><Link to="/checkout"><i className="material-icons">shopping_cart</i></Link></li>
                    </ul>
                </div>
            </nav>  
    )
}

export default NavbarComponent;