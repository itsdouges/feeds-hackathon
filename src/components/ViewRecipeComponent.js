'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';

import RecipeBadge from './RecipeBadgeComponent';
import Instructions from './InstructionsComponent';

import '../styles/ViewRecipe.less';

class ViewRecipeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loadedWebsite: false
    };

    this.getRecipeView = this.getRecipeView.bind(this);
  }

  componentDidMount() {
    this.props.viewRecipe(this.props.params.recipeId);
  }

  componentDidUpdate() {
    let recipe = this.props.state.recipe.viewRecipe;
    if (!this.state.loadedWebsite && recipe) {
      this.props.extractWebsite(recipe.sourceUrl);
      this.setState({
        loadedWebsite: true
      });
    }
  }

  getRecipeView() {
    const { state } = this.props;
    const recipe = state.recipe.viewRecipe;
    const website = state.recipe.websiteRecipe;

    return recipe ?
      <div className="recipe">
        <div className="image-slider">
          <img src={ recipe.image } className="img-responsive" />
        </div>
        <h2>{ recipe.title }</h2>
        <RecipeBadge recipe={recipe} />
        <ul>
          {
              recipe.extendedIngredients.map((ingredient,i) => {
                return <li key={i}>{ ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name }</li>
              })
          }
        </ul>
        { website ? <Instructions steps={ website.text } /> : null }
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
