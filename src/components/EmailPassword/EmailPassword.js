import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import AuthForm from "../forms/AuthForm/AuthForm";
import FormInput from "../forms/FormInput/FormInput";
import Button from "../forms/Button/Button";
import {auth} from "../../firebase/utils";

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault()
        try {
            const  { email } = this.state
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log('Password reset')
                    this.props.history.push('/login')
                })
                .catch(() => {
                    console.log('Something gone wrong')
                    const err = ['This email doesn\'t exist']
                    this.setState({
                        errors: err
                    })
                })

        } catch(err) {
            console.log(err)
        }
    }

    render() {
        const { email, errors } = this.state

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
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                        <Button type="submit">Reset</Button>
                    </form>
                </div>
            </AuthForm>
        )
    }
}

export default withRouter(EmailPassword)