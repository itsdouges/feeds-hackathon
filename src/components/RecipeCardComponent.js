'use strict';

import React from 'react';

import '../styles/RecipeCard.less';

const IMAGE_URI = 'https://spoonacular.com/recipeImages/';

class RecipeCardComponent extends React.Component {

  render() {
    const { recipe } = this.props;

    return (
      <div className="recipecard-component">
        <a href={ '/recipe/view/' + recipe.id }>
          <img className="img-responsive" src={IMAGE_URI + recipe.image} />
          <div className="title">
            { recipe.title }
          </div>
        </a>
      </div>
    );
  }
}

RecipeCardComponent.displayName = 'RecipeCardComponent';

RecipeCardComponent.propTypes = {
  recipe: React.PropTypes.object
};
// RecipeCardComponent.defaultProps = {};

export default RecipeCardComponent;
