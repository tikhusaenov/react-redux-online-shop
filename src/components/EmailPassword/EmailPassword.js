import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import AuthForm from "../forms/AuthForm/AuthForm";
import FormInput from "../forms/FormInput/FormInput";
import Button from "../forms/Button/Button";
import {auth} from "../../firebase/utils";
import {resetAuthForms, resetUserPassword} from "../../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})


const EmailPassword = (props) => {
    const dispatch = useDispatch()
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (resetPasswordSuccess) {
            console.log('Password reset')
            dispatch(resetAuthForms())
            props.history.push('/login')
        }

    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length !== 0) {
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleFormSubmit = async event => {
        event.preventDefault()
        dispatch(resetUserPassword({ email }))
    }


    return (
        <AuthForm heading="Reset password">
            <div className="form-wrapper">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>{err}</li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Reset</Button>
                </form>
            </div>
        </AuthForm>
    )

}

export default withRouter(EmailPassword)