'use strict';

import React from 'react';
import { Link } from 'react-router';

import '../styles/RecipeCard.less';

const IMAGE_URI = 'https://spoonacular.com/recipeImages/';

class RecipeCardComponent extends React.Component {

  render() {
    const { recipe, noLink, isLocal, hideImage } = this.props;
    const style = hideImage ? {
      height: '10em'
    } : {};

    let image = isLocal ? <img style={style} className="img-responsive" src={IMAGE_URI + 'default.png'} />
        : <img style={style} className="img-responsive" src={IMAGE_URI + (recipe.image && recipe.image.replace(IMAGE_URI, ''))} />;

    const content = (
      <div>
        {image}
        <div className="title">
          { recipe.title }
        </div>
      </div>
    );

    const view = noLink ? content : (
      <Link to={ '/recipe/view/' + (isLocal ? 'local' : 'online') + '/' + recipe.id }>
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
  recipe: React.PropTypes.object,
  isLocal: React.PropTypes.bool,
  noLink: React.PropTypes.bool,
  hideImage: React.PropTypes.bool
};
// RecipeCardComponent.defaultProps = {};

export default RecipeCardComponent;