import userTypes from "./userTypes";
import { auth, GoogleProvider, handleUserProfile } from "../../firebase/utils";

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        })
    } catch(err) {
        console.log(err)
    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
       await auth.signInWithPopup(GoogleProvider)
           .then(() => {
               dispatch({
                   type: userTypes.SIGN_IN_SUCCESS,
                   payload: true
               })
           })
    } catch (err) {
        console.log(err)
    }

}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ['Password Doesn\'t match']
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        })
        return
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        await handleUserProfile(user, { displayName })
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })

    } catch(err) {
        console.log(err)
    }
}

export const resetUserPassword = ({ email }) => async dispatch => {
    try {
        const config = {
            url: 'http://localhost:3000/login'
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                console.log('Something gone wrong')
                const err = ['This email doesn\'t exist']
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
            })
    } catch(err) {
        console.log(err)
    }
}

export const resetAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})
