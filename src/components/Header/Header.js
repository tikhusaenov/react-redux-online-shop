import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'



const Header = props => {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <Link to="/">
                        <span>FashionBy.</span>
                    </Link>
                </div>
                <div className="actions">
                    <ul className="actions-list">
                        <li className="actions-link">
                            <Link to="/registration">Register</Link>
                        </li>
                        <li className="actions-link">
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header