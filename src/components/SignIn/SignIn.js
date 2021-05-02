import React, { Component } from 'react'
import Button from "../forms/Button/Button";
import { auth, handleUserProfile } from '../../firebase/utils'
import { signInWithGoogle } from '../../firebase/utils'
import FormInput from "../forms/FormInput/FormInput";
import "./styles.scss"


const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleFormSubmit = async event => {
        event.preventDefault()
        const { email, password } = this.state
        try {
           await auth.signInWithEmailAndPassword(email, password)
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
        const { email, password } = this.state
        return (
            <div className="signin">
                <div className="wrapper">
                    <div className="heading">
                        <span>Login</span>
                    </div>
                    <div className="form-wrapper">
                        <form onSubmit={this.handleFormSubmit}>
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
                            <Button type="submit">Sign In</Button>

                            <Button onClick={signInWithGoogle}>
                                Sign in with Google
                            </Button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

}

export default SignIn
