'use strict';

import React from 'react';

require('styles//CreateIngredient.less');

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

  render() {
  	const form = this.state.adding && (
		<div>
  			<input type="text" placeholder="Name" />
  			<input type="text" placeholder="Description" />
  			<input type="text" placeholder="Calories" />
  			<input type="text" placeholder="Type" />
  			<button>add!</button>
  		</div>
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
