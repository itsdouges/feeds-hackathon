'use strict';

import React from 'react';
import Ingredient from './IngredientComponent';
import CreateIngredient from './CreateIngredientComponent';

class IngredientListComponent extends React.Component {
  constructor (props) {
  	super(props);

  	this.state = {
  		ingredients: props.defaultValue,
  	};
  }

  addIngredient (item) {
  	const ingredients = this.state.ingredients;
  	ingredients.push(item);

  	this.setState({
  		...this.state,
  		ingredients,
  	});

  	this.props.onChange(ingredients);
  }

  removeIngredient (ingredient) {
  	const ingredients = this.state.ingredients.filter((item) => {
  		return item !== ingredient;
  	});

  	this.setState({
  		...this.state,
  		ingredients,
  	});

  	this.props.onChange(ingredients);
  }

  render() {
  	const ingredients = this.state.ingredients.length > 0 && this.state.ingredients.map((item, index) => {
  		return (
			<Ingredient data={item} key={index} onRemove={this.removeIngredient.bind(this)} />
		);
  	});

    return (
      <div style={{
        marginTop: '3em'
      }}>
        <div>{ingredients}</div>

        <CreateIngredient onAdd={this.addIngredient.bind(this)} />
      </div>
    );
  }
}

IngredientListComponent.displayName = 'IngredientListComponent';

// Uncomment properties you need
// IngredientListComponent.propTypes = {};
// IngredientListComponent.defaultProps = {};

export default IngredientListComponent;
