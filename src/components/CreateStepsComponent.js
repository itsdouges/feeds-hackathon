'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class CreateStepsComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			// adding: false,
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

		const data = this.getData();
		if (data) {
			this.props.onAdd(data);
			this.reset();
		}
	}

	getData () {
		const data = this.refs.text.value;

		if (data) {
			return data;
		}

		return undefined;
	}

	reset () {
		this.refs.text.value = '';
		this.refs.text.focus();
		// this.setState({
		// 	...this.state,
		// 	adding: false,
		// })
	}

  render() {
  	const form = (
		<form>
      <br/>
      <br/>
			<span className="recipe-description">{this.props.stepNumber}, </span>
  			<input style={{width: '425px'}} className="recipe-description textbox" autoFocus ref="text" type="text" placeholder="put the fry pan on medium heat.." />
  			<button style={{background: 'none', border: 'none', outline: 'none', fontSize: '1.7em'}} onClick={this.add.bind(this)}><i className="fa fa-plus"></i></button>
  		</form>
	);

	// const modeButton = this.state.adding ? 
	// 	<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, false); }}>-</button> :
	// 	<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, true); }}>+</button>;

    return (
      <div className="step-component">
        {form}
      </div>
    );
  }
}

CreateStepsComponent.displayName = 'CreateStepComponent';

// Uncomment properties you need
// CreateIngredientComponent.propTypes = {};
// CreateIngredientComponent.defaultProps = {};

export default CreateStepsComponent;
