'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RecipeList from './../RecipeListComponent';

import '../../styles/views/SavedRecipes.less';

class SavedRecipesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const localRecipes = this.props.state.recipe.localRecipes;
    const onlineRecipes = this.props.state.recipe.onlineRecipes;

    const exists = (Object.keys(localRecipes).length || Object.keys(onlineRecipes).length);

    const message = !exists && <span>Oh, you have no recipes.  Why not <Link className="btn-link" to="/recipe/find">find</Link> or <Link className="btn-link" to="/recipe/create">create</Link> some :-)</span>;

    return (
      <div className="savedrecipes-component page">
        <RecipeList recipes={localRecipes} isLocal />
        <RecipeList recipes={onlineRecipes} />
        {message}
      </div>
    );
  }
}

SavedRecipesComponent.displayName = 'SavedRecipesComponent';

// Uncomment properties you need
// SavedRecipesComponent.propTypes = {};
// SavedRecipesComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRecipesComponent);
