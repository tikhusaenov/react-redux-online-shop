import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../redux/user/userActions";
import AuthForm from "../forms/AuthForm/AuthForm";
import Button from "../forms/Button/Button";
import FormInput from "../forms/FormInput/FormInput";

import "./styles.scss"

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = (props) => {
    const dispatch  = useDispatch()
    const { currentUser } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(currentUser) {
           resetForm();
           props.history.push('/')
        }
    }, [currentUser])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        dispatch(emailSignInStart({ email, password }))
    }

    const handleGoogleSubmit = event => {
        event.preventDefault()
        dispatch(googleSignInStart())
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
