'use strict';

import React from 'react';

import '../styles/MyListsView.less';

class MyListsViewComponent extends React.Component {
  render() {
    return (
      <div className="mylistview-component page">
      	<div>
	        list of shopping lists
	        <br />
	        <a href="/lists/create">create list</a>
        </div>
      </div>
    );
  }
}

MyListsViewComponent.displayName = 'MyListsViewComponent';

// Uncomment properties you need
// MyListsViewComponentComponent.propTypes = {};
// MyListsViewComponentComponent.defaultProps = {};

export default MyListsViewComponent;
