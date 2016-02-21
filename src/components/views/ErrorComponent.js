'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';

import '../../styles/views/Error.less';

class ErrorComponent extends React.Component {
  render() {
    return (
      <div className="error-component">
        <i className="fa fa-frown-o" />
        <span>404</span>
      </div>
    );
  }
}

ErrorComponent.displayName = 'ErrorComponent';

// Uncomment properties you need
// ErrorComponent.propTypes = {};
// ErrorComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
