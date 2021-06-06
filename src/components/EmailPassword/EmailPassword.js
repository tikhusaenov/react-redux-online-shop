import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthForm from "../forms/AuthForm/AuthForm";
import FormInput from "../forms/FormInput/FormInput";
import Button from "../forms/Button/Button";
import { resetPasswordStart, resetUserState } from "../../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";

import './styles.scss'


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr,
})


const EmailPassword = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { resetPasswordSuccess, userErr } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState())
            history.push('/login')
        }

    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length !== 0) {
            setErrors(userErr)
        }
    }, [userErr])

    const handleFormSubmit = async event => {
        event.preventDefault()
        dispatch(resetPasswordStart({ email }))
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

export default EmailPassword