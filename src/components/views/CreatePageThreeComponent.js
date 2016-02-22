'use strict';

import React from 'react';
import StepList from '../StepListComponent';

class PageThree extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			errors: {},
			steps: props.data.steps || [],
		};
	}

	done (e) {
		e.preventDefault();

		const value = this.refs.name.value;
	    if (value) {
	      this.props.save({
	      	name: this.refs.name.value,
	      });
	    }
	}

	onChange (steps) {
		this.setState({
			...this.state,
			steps,
		});

		this.props.setValid(!!steps.length);

      this.props.save({
      	steps
      });
	}

	save () {
		
	}

  render() {
  	console.log(this.props);

    return (
      <div className="page">
      	<div>
	      	<span className="recipe-description">How do you make it though? Spare no detail!</span>
	    	  <StepList onChange={this.onChange.bind(this)} defaultValue={this.state.steps} />
    	 </div>
      </div>
    );
  }
}

PageThree.displayName = 'ViewsCreatePageOneComponent';

// Uncomment properties you need
// CreatePageOneComponent.propTypes = {};
// CreatePageOneComponent.defaultProps = {};

export default PageThree;
