import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/utils'
import './styles.scss'



const Header = (props) => {
    const { currentUser } = props
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <Link to="/">
                        <span>FashionBy.</span>
                    </Link>
                </div>
                <div className="actions">
                    { currentUser && (
                        <ul className="actions-list">
                            <li className="actions-link">
                                <span onClick={() => auth.signOut()}>
                                    Logout
                                </span>
                            </li>
                        </ul>
                    )}
                    { !currentUser && (
                        <ul className="actions-list">
                            <li className="actions-link">
                                <Link to="/registration">Register</Link>
                            </li>
                            <li className="actions-link">
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    ) }
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header