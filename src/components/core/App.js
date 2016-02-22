import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../../reducers';

import Layout from './LayoutComponent';
import Home from '../views/HomeComponent';
import Error from '../views/ErrorComponent';
import CreateView from '../views/CreateComponent';
import FindRecipe from '../views/FindRecipeComponent';
import SavedRecipes from '../views/SavedRecipesComponent';
import ViewRecipe from '../views/ViewRecipeComponent';
import ViewLocalRecipe from '../views/ViewLocalRecipeComponent';
import CreateListView from '../views/CreateListViewComponent';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class AppComponent extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Layout}>
            <Route path='/recipe/find' component={FindRecipe} />
            <Route path='/recipe/create' component={CreateView} />
            <Route path='/recipe/view/online/:recipeId' component={ViewRecipe} />
            <Route path='/recipe/view/local/:recipeId' component={ViewLocalRecipe} />
            <Route path='/recipe/saved' component={SavedRecipes} />
            <Route path='/create-shopping-list' component={CreateListView} />

            <IndexRoute component={Home} />
            <Route path='*' component={Error} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
