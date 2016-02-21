'use strict';

import * as types from './types';
import Firebase from 'firebase';

const endPoint = 'https://feedshackathon.firebaseio.com';
const loginRef = new Firebase(endPoint);
const API_KEY = 'oI8K3gw76zmshqdp5Ns7rPJDW2kHp19pwDljsnid6PkJte1yuo';

function startLoading() {
    return {
        type: types.LOADING
    };
}

function startLoadingWebsite() {
    return {
        type: types.LOADINGWEBSITE
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
        dispatch(startLoadingWebsite());

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

export function setRecipeListeners() {
    return dispatch => {
        let authData = loginRef.getAuth();
        if (authData) {
            const recipeRef = new Firebase(endPoint + '/users/' + authData.uid + '/onlineRecipes/');
            recipeRef.on('child_added', (snapshot) => {
                dispatch(setOnlineRecipeAddComplete(snapshot));
            });
            recipeRef.on('child_removed', (snapshot) => {
                dispatch(setOnlineRecipeRemoveComplete(snapshot));
            });

            const localRecipeRef = new Firebase(endPoint + '/users/' + authData.uid + '/localRecipes/');
            localRecipeRef.on('child_added', (snapshot) => {
                let val = snapshot.val();
                val.id = snapshot.key();
                dispatch(setLocalRecipeAddComplete(snapshot.key(), val));
            });
            localRecipeRef.on('child_removed', (snapshot) => {
                dispatch(setLocalRecipeRemoveComplete(snapshot.key(), snapshot.val()));
            });

            loginRef.onAuth((authData) => {
                if (!authData) {
                    dispatch(reset());
                }
            });
        }
    }
}

function reset() {
    return {
        type: types.RESET
    };
}

function setOnlineRecipeAddComplete(snapshot) {
    return {
        type: types.ONLINERECIPEADDED,
        key: snapshot.key(),
        value: snapshot.val()
    };
}

function setOnlineRecipeRemoveComplete(snapshot) {
    return {
        type: types.ONLINERECIPEREMOVED,
        key: snapshot.key(),
        value: snapshot.val()
    };
}

function setLocalRecipeAddComplete(key, val) {
    return {
        type: types.LOCALRECIPEADDED,
        key: key,
        value: val
    };
}

function setLocalRecipeRemoveComplete(key, val) {
    return {
        type: types.LOCALRECIPEREMOVED,
        key: key,
        value: val
    };
}

export function addOnlineRecipe(recipe) {
    return dispatch => {
        let authData = loginRef.getAuth();
        if (authData) {
            const recipeRef = new Firebase(endPoint + '/users/' + authData.uid + '/onlineRecipes/' + recipe.id);
            recipeRef.set(recipe);
            dispatch(addOnlineRecipeComplete());
        } else {
            dispatch(addOnlineRecipeComplete());
        }
    }
}

function addOnlineRecipeComplete() {
    console.log('added');
    return {
        type: types.ADDONLINERECIPE
    };
}

export function removeOnlineRecipe(recipe) {
    return dispatch => {
        let authData = loginRef.getAuth();
        if (authData) {
            const recipeRef = new Firebase(endPoint + '/users/' + authData.uid + '/onlineRecipes/' + recipe.id);
            recipeRef.remove();
            dispatch(removeOnlineRecipeComplete());
        } else {
            dispatch(removeOnlineRecipeComplete());
        }
    }
}

function removeOnlineRecipeComplete() {
    console.log('removed');
    return {
        type: types.REMOVEONLINERECIPE
    };
}

export function addLocalRecipe(recipe) {
    return dispatch => {
        let authData = loginRef.getAuth();
        if (authData) {
            const recipeRef = new Firebase(endPoint + '/users/' + authData.uid + '/localRecipes/');
            recipeRef.push(recipe);
            dispatch(addLocalRecipeComplete());
        } else {
            dispatch(addLocalRecipeComplete());
        }
    }
}

function addLocalRecipeComplete() {
    return {
        type: types.ADDLOCALRECIPE
    };
}