'use strict';

import * as types from './types';

const initialState = {
    results: [],
    viewRecipe: null,
    recipeError: null,
    websiteRecipe: null,
    websiteError: null,
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
            console.log(action.results);
            return {
                ...state,
                results: action.results,
                recipeError: action.error,
                loading: false
            };
        case types.VIEWRECIPE:
            console.log(action.recipe);
            return {
                ...state,
                viewRecipe: action.recipe,
                recipeError: action.error
            };
        case types.EXTRACTWEBSITE:
            console.log(action.website);
            return {
                ...state,
                websiteRecipe: action.website,
                websiteError: action.error
            };
        default:
            return state;
    }
}