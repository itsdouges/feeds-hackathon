'use strict';

import React from 'react';
import { Link } from 'react-router';

import '../styles/RecipeCard.less';

const IMAGE_URI = 'https://spoonacular.com/recipeImages/';

class RecipeCardComponent extends React.Component {

  render() {
    const { recipe, noLink, hideImage } = this.props;
    const image = hideImage ? <span /> : <img className="img-responsive" src={IMAGE_URI + recipe.image.replace(IMAGE_URI, '')} />;

    const content = (
      <div>
        {image}
        <div className="title">
          { recipe.title }
        </div>
      </div>
    );

    const view = noLink ? content : 
    (
      <Link to={ '/recipe/view/' + recipe.id }>
        {content}
      </Link>
    );

    return (
      <div className="recipecard-component">
        {view}
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
