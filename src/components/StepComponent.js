'use strict';

import React from 'react';

class StepComponent extends React.Component {
	remove () {
		this.props.onRemove(this.props.data);
	}

  render() {
    return (
      <div className="step-component">
  		Step {this.props.number}: {this.props.data.text}

  		<button onClick={this.remove.bind(this)}>REMOVE</button>
      </div>
    );
  }
}

StepComponent.displayName = 'StepComponent';

// Uncomment properties you need
// StepComponent.propTypes = {};
// StepComponent.defaultProps = {};

export default StepComponent;
