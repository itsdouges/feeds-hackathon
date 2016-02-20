'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';

import '../styles/Error.less';

class ErrorComponent extends React.Component {
  render() {
    return (
      <div className="error-component">
        Please edit src/components///ErrorComponent.js to update this component!
      </div>
    );
  }
}

ErrorComponent.displayName = 'ErrorComponent';

// Uncomment properties you need
// ErrorComponent.propTypes = {};
// ErrorComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
