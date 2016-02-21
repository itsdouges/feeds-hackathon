'use strict';

import React from 'react';

require('styles//Instructions.less');

class InstructionsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let steps = this.props.steps.split(/\./g).filter(Boolean);

    return (
      <div className="instructions-component">
        <ol>
          {
            steps.map((step, i) => {
              return <li key={i}>{ step }</li>
            })
          }
        </ol>
      </div>
    );
  }
}

InstructionsComponent.displayName = 'InstructionsComponent';

// Uncomment properties you need
InstructionsComponent.propTypes = {
  steps: React.PropTypes.string
};
// InstructionsComponent.defaultProps = {};

export default InstructionsComponent;
