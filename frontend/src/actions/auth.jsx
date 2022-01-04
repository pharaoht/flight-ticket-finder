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
            dispatch({ type: AUTHENTICATED_FAIL })
        }
    }
    else {
        dispatch({ type: AUTHENTICATED_FAIL })
    }
}

export const load_user = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try {

            const response = await axios.get(`${url}auth/users/me/`, config);
            window.localStorage.setItem('info', response.data.id);

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: response.data
            });

        } catch (err) {

            dispatch({
                type: LOAD_USER_FAIL
            });
        };
    }
    else {
        dispatch({
            type: LOAD_USER_FAIL
        });
    };
};

export const login = (email, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {

        const res = await axios.post(`${url}auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());


    } catch (err) {

        console.log(err.response.data);

        dispatch({
            type: LOGIN_FAIL
        });

    };
};

export const reset_password = (email) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({ email });

    try {

        await axios.get(`${url}auth/users/rest_password/`, body, config);

        dispatch({
            type: PASSWORD_REST_SUCCESS
        });

    } catch (err) {

        dispatch({
            type: PASSWORD_REST_FAIL
        });
    };
};

export const reset_password_confirm = (userId, token, new_password, re_new_password) => async dispatch => {

    const csrf = axios.defaults.xsrfCookieName = 'csrftoken';
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf

        }
    };

    const body = JSON.stringify({ userId, token, new_password, re_new_password });

    try {

        await axios.post(`${url}auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_REST_CONFIRM_SUCCESS
        });

    } catch (err) {

        dispatch({
            type: PASSWORD_REST_CONFIRM_FAIL
        })
    };
};