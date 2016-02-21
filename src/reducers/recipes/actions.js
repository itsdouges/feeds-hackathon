'use strict';

import * as types from './types';

const API_KEY = 'oI8K3gw76zmshqdp5Ns7rPJDW2kHp19pwDljsnid6PkJte1yuo';

function startLoading() {
    return {
        type: types.LOADING
    };
}

export function findRecipe(state) {
    return dispatch => {
        dispatch(startLoading());

        let data = [];

        Object.keys(state).forEach((key) => {
            data.push(key + '=' + encodeURI(state[key]));
        });

        fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' + data.join('&'), {
            headers: {
                'X-Mashape-Key': API_KEY
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            dispatch(findRecipeComplete(null, json.results));
        }).catch((err) => {
            dispatch(findRecipeComplete(err, []));
        });
    }
}

function findRecipeComplete(error, results) {
    return {
        type: types.FINDRECIPES,
        results: results,
        error: error
    };
}

export function viewRecipe(id) {
    return dispatch => {
        dispatch(startLoading());

        fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information', {
            headers: {
                'X-Mashape-Key': API_KEY
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            dispatch(viewRecipeComplete(null, json));
        }).catch((err) => {
            dispatch(viewRecipeComplete(err, null));
        });
    }
}

function viewRecipeComplete(error, recipe) {
    return {
        type: types.VIEWRECIPE,
        recipe: recipe,
        error: error
    };
}

export function extractWebsite(uri) {
    return dispatch => {
        dispatch(startLoading());

        fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url=' + encodeURIComponent(uri), {
            headers: {
                'X-Mashape-Key': API_KEY
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            dispatch(extractWebsiteComplete(null, json));
        }).catch((err) => {
            dispatch(extractWebsiteComplete(err, null));
        });
    }
}

function extractWebsiteComplete(error, website) {
    return {
        type: types.EXTRACTWEBSITE,
        website: website,
        error: error
    };
}