'use strict';

import React from 'react';
import RecipeCard from './RecipeCardComponent';

import '../styles/RecipeList.less';

class RecipeListComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const recipes = this.props.recipes;

    return (
      <div className="recipelist-component">
        <ul>
          {
            Object.keys(recipes).map((key, i) => {
              return <li key={i}><RecipeCard recipe={recipes[key]} isLocal={this.props.isLocal} /></li>
            })
          }
        </ul>
      </div>
    );
  }
}

RecipeListComponent.displayName = 'RecipeListComponent';

// Uncomment properties you need
RecipeListComponent.propTypes = {
  recipes: React.PropTypes.any,
  isLocal: React.PropTypes.bool
};
// RecipeListComponent.defaultProps = {};

export default RecipeListComponent;
