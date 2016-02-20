'use strict';

import * as types from './types';

const initialState = {
    results: [],
    viewRecipe: null,
    error: null,
    loading: false
};

export default function recipe(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.FINDRECIPES:
            console.log(action.results);
            return {
                ...state,
                results: action.results,
                error: action.error,
                loading: false
            };
        case types.VIEWRECIPE:
            console.log(action.recipe);
            return {
                ...state,
                viewRecipe: action.recipe,
                error: action.error
            };
        default:
            return state;
    }
}