import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import './styles.scss'
import Button from "../forms/Button/Button";
import FormInput from "../forms/FormInput/FormInput";

import AuthForm from "../forms/AuthForm/AuthForm";
import {resetAuthForms, signUpUser} from "../../redux/user/userActions";


const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError,
})

const SignUp = (props) => {
    const dispatch = useDispatch()
    const { signUpSuccess, signUpError } = useSelector(mapState)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const resetForm = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrors([])
    }

    useEffect(() => {
        if (signUpSuccess === true) {
            resetForm()
            dispatch(resetAuthForms())
            props.history.push('/')
        }
    }, [signUpSuccess])

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length !== 0) {
            setErrors(signUpError)
        }
    }, [signUpError])

    const handleFormSubmit = event => {
        event.preventDefault()
        dispatch(signUpUser({ displayName, email, password, confirmPassword }))
    }

    return (
        <AuthForm heading="Register">
            <div className="form-wrapper">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={(e) => setDisplayName(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button type="submit">Register</Button>
                </form>
            </div>
        </AuthForm>
    )

}


export default withRouter(SignUp)