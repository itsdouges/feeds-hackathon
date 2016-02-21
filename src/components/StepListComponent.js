'use strict';

import React from 'react';
import CreateSteps from './CreateStepsComponent';
import Step from './StepComponent';

class StepListComponent extends React.Component {
  constructor (props) {
  	super(props);

  	this.state = {
  		steps: props.defaultValue,
  	};
  }

  add (step) {
  	const steps = this.state.steps;
  	steps.push(step);

  	this.setState({
  		...this.state,
  		steps,
  	});

  	this.props.onChange(steps);
  }

  remove (step) {
  	const steps = this.state.steps.filter((item) => {
  		return item !== step;
  	});

  	this.setState({
  		...this.state,
  		steps,
  	});

  	this.props.onChange(steps);
  }

  render() {
  	const steps = this.state.steps.length > 0 && this.state.steps.map((step, index) => {
  		return (
  			<Step 
          data={step} 
          key={index} 
          onRemove={this.remove.bind(this)} 
          number={index} />
		);
  	});

    const stepNumber = this.state.steps.length > 0 ? 'Then' : 'First';

    return (
      <div className="steplist-component" style={{
        marginTop: '3em'
      }}>
        {steps}
        <CreateSteps stepNumber={stepNumber} onAdd={this.add.bind(this)}  />
      </div>
    );
  }
}

StepListComponent.displayName = 'StepListComponent';

// Uncomment properties you need
// StepListComponent.propTypes = {};
// StepListComponent.defaultProps = {};

export default StepListComponent;
