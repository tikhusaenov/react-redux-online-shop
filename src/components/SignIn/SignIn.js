import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {resetAuthForms, signInUser, signInWithGoogle} from "../../redux/user/userActions";
import AuthForm from "../forms/AuthForm/AuthForm";
import Button from "../forms/Button/Button";
import FormInput from "../forms/FormInput/FormInput";

import "./styles.scss"

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = (props) => {
    const dispatch  = useDispatch()
    const { signInSuccess } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(signInSuccess === true) {
           resetForm();
           dispatch(resetAuthForms());
           props.history.push('/')
        }
    }, [signInSuccess])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        dispatch(signInUser({ email, password }))
    }

    const handleGoogleSubmit = event => {
        event.preventDefault()
        dispatch(signInWithGoogle())
    }

    return (
        <AuthForm heading="Login">
            <div className="form-wrapper">
                <form onSubmit={handleFormSubmit}>
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
                    <Button type="submit">Sign In</Button>

                    <Button onClick={handleGoogleSubmit}>
                        Sign in with Google
                    </Button>

                    <Link to="/reset">
                        Forgot password?
                    </Link>
                </form>
            </div>
        </AuthForm>
    )

}

export default withRouter(SignIn)
