'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';
import ContextStrip from './ContextStripComponent';

import 'normalize.css';
import '../styles/Layout.less';

class LayoutComponent extends React.Component {
  render() {
    return (
      <div className="layout-component">
      	<ContextStrip />
      	
        { this.props.children }
      </div>
    );
  }
}

LayoutComponent.displayName = 'LayoutComponent';

// Uncomment properties you need
// LayoutComponent.propTypes = {};
// LayoutComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
