'use strict';

import React from 'react';

class StepComponent extends React.Component {
	remove () {
		this.props.onRemove(this.props.data);
	}

  render() {
    console.log(this.props.number);
    const stepNumber = this.props.number > 0 ? 'Then' : 'First';

    return (
      <div className="step-component"> 
        <span className="recipe-description">{stepNumber}, </span>
        <span className="recipe-description">{this.props.data}</span>

        <a className="icon-button" onClick={this.remove.bind(this)}><i className="fa fa-times"></i></a>
      </div>
    );
  }
}

StepComponent.displayName = 'StepComponent';

// Uncomment properties you need
// StepComponent.propTypes = {};
// StepComponent.defaultProps = {};

export default StepComponent;
