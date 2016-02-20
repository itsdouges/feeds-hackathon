'use strict';

import * as types from './types';

export function login() {
    return dispatch => {
        dispatch(loginComplete());
    }
}

function loginComplete() {
    return {
        type: types.LOGIN
    }
}
