'use strict';

import React from 'react';
import IngredientList from '../IngredientListComponent';

class PageTwo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			errors: {},
			ingredients: props.data.ingredients || [],
		};
	}

	validate () {
		const state = {
			errors: {},
		};

		const ingredients = this.state.ingredients;
		if (!ingredients.length) {
			state.errors.ingredients = 'required';
		}

		this.setState(state);

		return Object.keys(state.errors).length === 0;
	}

	save () {

	}

	setIngredients (ingredients) {
		this.setState({
			...this.state,
			ingredients,
		});

		this.props.setValid(!!ingredients.length);

      this.props.save({
      	ingredients: ingredients
      });
	}

  render() {
    return (
      <div className="page">
      	<div>
	    	<h2>ingredients</h2>

			<IngredientList defaultValue={this.state.ingredients} onChange={this.setIngredients.bind(this)} />
		</div>
      </div>
    );
  }
}

PageTwo.displayName = 'ViewsCreatePageOneComponent';

// Uncomment properties you need
// CreatePageOneComponent.propTypes = {};
// CreatePageOneComponent.defaultProps = {};

export default PageTwo;
