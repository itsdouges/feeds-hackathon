'use strict';

import * as types from './types';

const initialState = {
    results: [],
    viewRecipe: null,
    recipeError: null,
    websiteRecipe: null,
    websiteError: null,
    loading: false,
    onlineRecipes: [],
    localRecipes: []
};

export default function recipe(state = initialState, action = {}) {
    let onlineRecipes = state.onlineRecipes;

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
        case types.ONLINERECIPEADDED:
            onlineRecipes[action.key] = action.value;
            return {
                ...state,
                onlineRecipes: onlineRecipes
            };
        case types.ONLINERECIPEREMOVED:
            delete onlineRecipes[action.key];
            return {
                ...state,
                onlineRecipes: onlineRecipes
            };
        default:
            return state;
    }
}