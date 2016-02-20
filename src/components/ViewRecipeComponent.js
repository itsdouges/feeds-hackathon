'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';

import '../styles/ViewRecipe.less';

class ViewRecipeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.getRecipeView = this.getRecipeView.bind(this);
  }

  componentDidMount() {
    this.props.viewRecipe(this.props.params.recipeId);
  }

  getRecipeView() {
    const { state } = this.props;
    const recipe = state.recipe.viewRecipe;

    return recipe ?
      <div className="recipe">
        <h2>{ recipe.title }</h2>
      </div> : null;
  }

  render() {
    const { state } = this.props;

    return (
      <div className="viewrecipe-component">
        { state.recipe.loading ? this.getRecipeView() : <i className="fa fa-refresh fa-spin loading" /> }
      </div>
    );
  }
}

ViewRecipeComponent.displayName = 'ViewRecipeComponent';

// Uncomment properties you need
// ViewRecipeComponent.propTypes = {};
// ViewRecipeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipeComponent);
