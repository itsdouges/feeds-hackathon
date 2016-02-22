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
                dispatch(setOnlineRecipeAddComplete(snapshot.key(), snapshot.val()));
            });
            recipeRef.on('child_removed', (snapshot) => {
                dispatch(setOnlineRecipeRemoveComplete(snapshot.key(), snapshot.val()));
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
        } else {
            console.log('checking local storage');
            if (typeof(Storage) !== 'undefined') {
                //localStorage.removeItem('onlineRecipes');
                //localStorage.removeItem('localRecipes');

                let onlineRecipes = JSON.parse(localStorage.getItem('onlineRecipes'));
                if (onlineRecipes) {
                    console.log(onlineRecipes);
                    Object.keys(onlineRecipes).forEach((key) => {
                        dispatch(setOnlineRecipeAddComplete(key, onlineRecipes[key]));
                    });
                }

                let localRecipes = JSON.parse(localStorage.getItem('localRecipes'));
                if (localRecipes) {
                    console.log(localRecipes);
                    Object.keys(localRecipes).forEach((key) => {
                        dispatch(setLocalRecipeAddComplete(key, localRecipes[key]));
                    });
                }
            }
        }
    }
}

function reset() {
    return {
        type: types.RESET
    };
}

function setOnlineRecipeAddComplete(key, val) {
    return {
        type: types.ONLINERECIPEADDED,
        key: key,
        value: val
    };
}

function setOnlineRecipeRemoveComplete(key, val) {
    return {
        type: types.ONLINERECIPEREMOVED,
        key: key,
        value: val
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
            if (typeof(Storage) !== 'undefined') {
                let strRec = {};
                let recipes = localStorage.getItem('onlineRecipes');
                if (recipes) {
                    let json = JSON.parse(recipes);
                    json[recipe.id] = recipe;
                    strRec = json;
                } else {
                    strRec[recipe.id] = recipe;
                }
                localStorage.setItem('onlineRecipes', JSON.stringify(strRec));
                dispatch(addOnlineRecipeComplete(strRec));
            }
        }
    }
}

function addOnlineRecipeComplete(localStorageItems) {
    console.log('added');
    return {
        type: types.ADDONLINERECIPE,
        localStorageItems: localStorageItems
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
            if (typeof(Storage) !== 'undefined') {
                let strRec = {};
                let recipes = localStorage.getItem('onlineRecipes');
                if (recipes) {
                    let json = JSON.parse(recipes);
                    delete json[recipe.id];
                    strRec = json;
                }
                localStorage.setItem('onlineRecipes', JSON.stringify(strRec));
                dispatch(removeOnlineRecipeComplete(strRec));
            }
        }
    }
}

function removeOnlineRecipeComplete(localStorageItems) {
    console.log('removed');
    return {
        type: types.REMOVEONLINERECIPE,
        localStorageItems: localStorageItems
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
            if (typeof(Storage) !== 'undefined') {
                let strRec = {};
                let recipes = localStorage.getItem('localRecipes');
                if (recipes) {
                    let json = JSON.parse(recipes);
                    json[recipe.id] = recipe;
                    strRec = json;
                } else {
                    strRec[recipe.id] = recipe;
                }
                localStorage.setItem('localRecipes', JSON.stringify(strRec));
                dispatch(addLocalRecipeComplete(strRec));
            }
        }
    }
}

function addLocalRecipeComplete(localStorageItems) {
    return {
        type: types.ADDLOCALRECIPE,
        localStorageItems: localStorageItems
    };
}