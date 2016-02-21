'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class CreateIngredientComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			adding: false,
		};
	}

	addMode (adding) {
		this.setState({
			...this.state,
			adding: adding,
		});
	}

	add (e) {
		e.preventDefault();

		const ingredient = this.getIngredient();
		if (ingredient) {
			this.props.onAdd(ingredient);
			this.reset();
		}
	}

	getIngredient () {
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
		this.setState({
			...this.state,
			adding: false,
		})
	}

  render() {
  	const form = this.state.adding && (
		<form>
  			<input autoFocus ref="name" type="text" placeholder="Name" /><br/>
  			<input ref="amount" type="text" placeholder="Amount" /><br/>
  			<input ref="unit" type="text" placeholder="Unit" /><br/>
  			<button onClick={this.add.bind(this)}>add!</button>
  		</form>
	);

	const modeButton = this.state.adding ? 
		<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, false); }}>-</button> :
		<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, true); }}>+</button>;

    return (
      <div className="createingredient-component">
        {form}
        {modeButton}
      </div>
    );
  }
}

CreateIngredientComponent.displayName = 'CreateIngredientComponent';

// Uncomment properties you need
// CreateIngredientComponent.propTypes = {};
// CreateIngredientComponent.defaultProps = {};

export default CreateIngredientComponent;
