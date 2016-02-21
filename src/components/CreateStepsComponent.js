'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class CreateStepsComponent extends React.Component {
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

		const data = this.getData();
		if (data) {
			this.props.onAdd(data);
			this.reset();
		}
	}

	getData () {
		const data = {
			text: this.refs.text.value,
		};

		if (data.text) {
			return data;
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
  			<input autoFocus ref="text" type="text" placeholder="Step" /><br/>
  			<button onClick={this.add.bind(this)}>add!</button>
  		</form>
	);

	const modeButton = this.state.adding ? 
		<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, false); }}>-</button> :
		<button onClick={(e) => { e.preventDefault(); this.addMode.call(this, true); }}>+</button>;

    return (
      <div className="step-component">
        {form}
        {modeButton}
      </div>
    );
  }
}

CreateStepsComponent.displayName = 'CreateStepComponent';

// Uncomment properties you need
// CreateIngredientComponent.propTypes = {};
// CreateIngredientComponent.defaultProps = {};

export default CreateStepsComponent;
