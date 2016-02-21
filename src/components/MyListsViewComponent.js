'use strict';

import React from 'react';

require('styles//MyListsViewComponent.less');

class MyListsViewComponentComponent extends React.Component {
  render() {
    return (
      <div className="page">
      	<div>
	        list of shopping lists
	        <br />
	        <a href="/lists/create">create list</a>
        </div>
      </div>
    );
  }
}

MyListsViewComponentComponent.displayName = 'MyListsViewComponentComponent';

// Uncomment properties you need
// MyListsViewComponentComponent.propTypes = {};
// MyListsViewComponentComponent.defaultProps = {};

export default MyListsViewComponentComponent;
