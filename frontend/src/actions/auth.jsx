import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_REST_FAIL,
    PASSWORD_REST_SUCCESS,
    PASSWORD_REST_CONFIRM_FAIL,
    PASSWORD_REST_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from './types'

const url = 'http://localhost:8000/';

export const checkAuthenticated = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {

            const response = await axios.post(`${url}auth/jwt/verify`, body, config);

            if (response.data.code !== 'toekn_not_valid') {
                dispatch({ type: AUTHENTICATED_SUCCESS })
            }
            else {
                dispatch({ type: AUTHENTICATED_FAIL })
            }
        }
        catch (error) { 
            dispatch({ type: AUTHENTICATED_FAIL})
        }
    }
    else {
        dispatch({ type: AUTHENTICATED_FAIL })
    }


}

export const load_user = () => async dispatch => {
    
    if (localStorage.getItem('access')){
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
    };
};