import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';
import '../styles/Home.less';

class HomeComponent extends React.Component {
  render() {
    return (
      <div className="home">
      	<div className="hero-icon"></div>
        <h1 className="title-hero">feed</h1>

        <div className="home-actions">
        	<a href="/recipe/find">Find</a>
        	<a href="/recipe/create">Create</a>
        	<a href="/recipe/saved">My Recipes</a>
          <a href="/lists">My Lists</a>
        </div>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
