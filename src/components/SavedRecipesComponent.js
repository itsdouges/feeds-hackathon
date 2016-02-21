'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';

import RecipeList from './RecipeListComponent';

import '../styles/SavedRecipes.less';

class SavedRecipesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const localRecipes = this.props.state.recipe.localRecipes;
    const onlineRecipes = this.props.state.recipe.onlineRecipes;

    return (
      <div className="savedrecipes-component">
        <RecipeList recipes={localRecipes} local />
        <RecipeList recipes={onlineRecipes} />
      </div>
    );
  }
}

SavedRecipesComponent.displayName = 'SavedRecipesComponent';

// Uncomment properties you need
// SavedRecipesComponent.propTypes = {};
// SavedRecipesComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRecipesComponent);
