'use strict';

import React from 'react';
import Ingredient from './IngredientComponent';
import CreateIngredient from './CreateIngredientComponent';

class IngredientListComponent extends React.Component {
  constructor () {
  	super();

  	this.state = {
  		ingredients: [],
  	};
  }

  addIngredient () {
  	console.log('adding');
  }

  render() {
  	const ingredients = this.state.ingredients.length > 0 && this.state.ingredients.length.map((item) => {
  		return (
			<Ingredient />
		);
  	});

    return (
      <div className="ingredientlist-component">
        <div>{ingredients}</div>

        <CreateIngredient add={this.addIngredient.bind(this)} />
      </div>
    );
  }
}

IngredientListComponent.displayName = 'IngredientListComponent';

// Uncomment properties you need
// IngredientListComponent.propTypes = {};
// IngredientListComponent.defaultProps = {};

export default IngredientListComponent;
