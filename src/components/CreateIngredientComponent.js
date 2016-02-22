'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class CreateIngredientComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			// adding: true,
			// initialAdd: true,
		};
	}

	// addMode (adding) {
	// 	this.setState({
	// 		...this.state,
	// 		adding: adding,
	// 	});
	// }

	add (e) {
		e.preventDefault();

		const ingredient = this.getIngredient();
		if (ingredient) {
			this.props.onAdd(ingredient);
			this.reset();
		}
	}

	getIngredient () {
		if (!this.refs.name) {
			return undefined;
		}

		const item = {
			name: this.refs.name.value,
			amount: this.refs.amount.value,
			unit: this.refs.unit.value
		};

		if (item.name && item.amount && item.unit) {
			return item;
		}

		return undefined;
	}

	reset () {
		// this.setState({
		// 	...this.state,
		// 	// adding: true,
		// 	initialAdd: false,
		// });

		this.refs.amount.value = '';
		this.refs.unit.value = '';
		this.refs.name.value = '';
		this.refs.amount.focus();
	}

  componentDidMount () {
    this.refs.amount && this.refs.amount.focus();
  }

  render() {
  	const form = (
		<form>
  			<input autofocus className="recipe-description textbox small" ref="amount" type="number" placeholder="250" /> 
  			<input style={{width: '150px'}} className="recipe-description textbox" ref="unit" type="text" placeholder="grams" /> 
  			<span className="recipe-description"> of </span>
  			<input className="recipe-description textbox" autoFocus ref="name" type="text" placeholder="Rib Eye Steak" />
  			<button style={{background: 'none', border: 'none', outline: 'none', fontSize: '1.7em'}} onClick={this.add.bind(this)}><i className="fa fa-plus"></i></button>
  		</form>
	);

	// const modeButton = !this.state.initialAdd && (
	// 	this.state.adding ? 
	// 	<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, false); }}>-</button> :
	// 	<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, true); }}>+</button>
	// );

    return (
      <div className="page">
        {form}
      </div>
    );
  }
}

CreateIngredientComponent.displayName = 'CreateIngredientComponent';

// Uncomment properties you need
// CreateIngredientComponent.propTypes = {};
// CreateIngredientComponent.defaultProps = {};

export default CreateIngredientComponent;
