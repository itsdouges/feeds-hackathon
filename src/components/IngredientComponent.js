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
      <div style={{
        margin: '1em 0'
      }}>
        <span className="recipe-description">{this.props.data.amount} </span>
        <span className="recipe-description">{this.props.data.unit}</span>
        <span className="recipe-description"> of </span>
        <span className="recipe-description">{this.props.data.name}</span>

        <a className="icon-button" onClick={this.remove.bind(this)}><i className="fa fa-times"></i></a>
      </div>
    );
  }
}

IngredientComponent.displayName = 'IngredientComponent';

// Uncomment properties you need
// IngredientComponent.propTypes = {};
// IngredientComponent.defaultProps = {};

export default IngredientComponent;
