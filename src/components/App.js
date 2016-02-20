import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

import Layout from './LayoutComponent';
import Home from './HomeComponent';
import Error from './ErrorComponent';
import CreateView from './views/CreateComponent';
import FindRecipe from './FindRecipeComponent';
import ViewRecipe from './ViewRecipeComponent';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class AppComponent extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Layout}>
            <Route path='/recipe/find' component={FindRecipe} />
            <Route path='/create' component={CreateView} />
            <Route path='/recipe/view/:recipeId' component={ViewRecipe} />

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
