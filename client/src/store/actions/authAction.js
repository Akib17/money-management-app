import Axios from 'axios'
import * as Types from './types'
import JwtDecode from 'jwt-decode'
import authToken from '../../utilities/authUtilies'

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/registration', user)
        .then(res => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            let token = res.data.token
            localStorage.setItem('auth_token', token)
            authToken(token)
            let decode = JwtDecode(token)
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            })
            history.push('/')
            // Decode our token
            // Save token to our localstorage
            // Set auth header
            // Dispatch SET user
            return
        })
        .catch(error => {
            // console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}