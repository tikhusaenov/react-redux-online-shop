import React, { Component } from 'react'
import './styles.scss'
import Button from "../forms/Button/Button";
import {signInWithGoogle} from "../../firebase/utils";
import FormInput from "../forms/FormInput/FormInput";

import { auth, handleUserProfile} from "../../firebase/utils";
import AuthForm from "../forms/AuthForm/AuthForm";

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleFormSubmit = async event => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            const err = ['Password Doesn\'t match']
            this.setState({
                errors: err
            })
            return
        }
        try {
            const user = await auth.createUserWithEmailAndPassword(email, password)
            await handleUserProfile(user, { displayName })
            this.setState({
                ...initialState
            })

        } catch(err) {
            console.log(err)
        }

    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state

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
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="text"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={this.handleChange}
                        />

                        <Button type="submit">Register</Button>
                    </form>
                </div>
            </AuthForm>
        )
    }
}


export default SignUp