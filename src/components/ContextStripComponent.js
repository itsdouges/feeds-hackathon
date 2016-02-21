'use strict';

import React from 'react';

require('styles//ContextStrip.less');

class ContextStripComponent extends React.Component {
  render() {
    return (
      <div className="context-strip">
      	<a href="/">feed</a>
      </div>
    );
  }
}

ContextStripComponent.displayName = 'ContextStripComponent';

// Uncomment properties you need
// ContextStripComponent.propTypes = {};
// ContextStripComponent.defaultProps = {};

export default ContextStripComponent;
