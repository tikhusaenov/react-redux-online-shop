import React, { Component } from 'react'
import './styles.scss'
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";


const AuthForm = props => {
    const { heading, children } = props
    return (
        <div className="auth-form">
            <div className="wrapper">
                <div className="heading">
                    {heading && <span>{ heading }</span>}
                </div>
                <div className="children">
                    { children && children}
                </div>
            </div>
        </div>
    )
}


export default AuthForm