'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import RecipeList from './../RecipeListComponent';

import '../../styles/views/SavedRecipes.less';

class SavedRecipesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.random = this.random.bind(this);
  }

  random(e) {
    e.preventDefault();

    const localRecipes = this.props.state.recipe.localRecipes;
    const onlineRecipes = this.props.state.recipe.onlineRecipes;
    const allRecipes = {
      ...localRecipes,
      ...onlineRecipes
    };
    let randomNumber = Math.floor(Math.random() * Object.keys(allRecipes).length);
    let randomRecipeKey = Object.keys(allRecipes)[randomNumber];

    if (localRecipes[randomRecipeKey]) {
      browserHistory.push('/recipe/view/local/' + randomRecipeKey);
    } else if (onlineRecipes[randomRecipeKey]) {
      browserHistory.push('/recipe/view/online/' + randomRecipeKey);
    }
  }

  render() {
    const localRecipes = this.props.state.recipe.localRecipes;
    const onlineRecipes = this.props.state.recipe.onlineRecipes;

    const exists = (Object.keys(localRecipes).length || Object.keys(onlineRecipes).length);
    const message = !exists && <span className="recipe-description">Oh, you have no recipes.  Go <Link className="btn-link" to="/recipe/find">find</Link> and <Link className="btn-link" to="/recipe/create">create</Link> some :-)</span>;

    return (
      <div className="page">
        <div className="savedrecipes-component">
          <div className="home-actions">
            <a href="#" onClick={this.random}>
              <i style={{marginRight:'0.25em'}} className="fa fa-random"></i> random <span className="feed">feed</span>
            </a>
          </div>

          <RecipeList recipes={localRecipes} isLocal />
          <RecipeList recipes={onlineRecipes} />
          {message}
        </div>
      </div>
    );
  }
}

SavedRecipesComponent.displayName = 'SavedRecipesComponent';

// Uncomment properties you need
// SavedRecipesComponent.propTypes = {};
// SavedRecipesComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRecipesComponent);
