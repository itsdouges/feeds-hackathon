'use strict';

import * as types from './types';

const initialState = {
    authData: null,
    error: null
};

export default function authentication(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                authData: action.authData,
                error: action.error
            };
        case types.LOGOUT:
            return {
                ...state,
                authData: action.authData
            };
        default:
            return state;
    }
}