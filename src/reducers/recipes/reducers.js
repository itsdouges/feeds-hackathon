'use strict';

import * as types from './types';

const initialState = {
    results: [],
    error: null,
    loading: false
};

export default function recipe(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true
            };
        case types.FINDRECIPES:
            return {
                ...state,
                results: action.results,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}