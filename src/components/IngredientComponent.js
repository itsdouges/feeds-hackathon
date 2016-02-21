'use strict';

import React from 'react';

require('styles//Ingredient.less');

class IngredientComponent extends React.Component {
	remove (e) {
		e.preventDefault();

		this.props.onRemove(this.props.data);
	}

  render() {
    return (
      <div className="ingredient-component">
      	<div>{this.props.data.name}</div>
      	<div>{this.props.data.unit}</div>
      	<div>{this.props.data.amount}</div>
        <button onClick={this.remove.bind(this)}>Remove ME</button>
      </div>
    );
  }
}

IngredientComponent.displayName = 'IngredientComponent';

// Uncomment properties you need
// IngredientComponent.propTypes = {};
// IngredientComponent.defaultProps = {};

export default IngredientComponent;
