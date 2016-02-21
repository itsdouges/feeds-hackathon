'use strict';

import React from 'react';
import { Link } from 'react-router';

import '../styles/RecipeCard.less';

const IMAGE_URI = 'https://spoonacular.com/recipeImages/';

class RecipeCardComponent extends React.Component {

  render() {
    const { recipe } = this.props;
    const image = this.props.isLocal ? <img className="img-responsive" src={IMAGE_URI + 'default.png'} />
        : <img className="img-responsive" src={IMAGE_URI + recipe.image.replace(IMAGE_URI, '')} />;

    return (
      <div className="recipecard-component">
        <Link to={ '/recipe/view/' + (this.props.isLocal ? 'local' : 'online') + '/' + recipe.id }>
          {image}
          <div className="title">
            { recipe.title }
          </div>
        </Link>
      </div>
    );
  }
}

RecipeCardComponent.displayName = 'RecipeCardComponent';

RecipeCardComponent.propTypes = {
  recipe: React.PropTypes.object,
  isLocal: React.PropTypes.bool
};
// RecipeCardComponent.defaultProps = {};

export default RecipeCardComponent;
