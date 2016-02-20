'use strict';

import * as types from './types';

const API_KEY = 'oI8K3gw76zmshqdp5Ns7rPJDW2kHp19pwDljsnid6PkJte1yuo';

export function startLoading() {
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
            dispatch(findRecipeComplete(json.results, null));
        }).catch((err) => {
            dispatch(findRecipeComplete([], err));
        });
    }
}

function findRecipeComplete(results, error) {
    return {
        type: types.FINDRECIPES,
        results: results,
        error: error
    };
}