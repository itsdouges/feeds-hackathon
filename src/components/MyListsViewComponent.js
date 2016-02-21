'use strict';

import React from 'react';
import { Link } from 'react-router';

import '../styles/MyListsView.less';

class MyListsViewComponent extends React.Component {
  render() {
    return (
      <div className="mylistview-component page">
      	<div>
	        list of shopping lists
	        <br />
	        <Link className="btn-link" to="/lists/create">Create</Link> 
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
