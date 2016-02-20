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

        <ul className="home-actions">
        	<li><a href="/recipe/find">Find</a></li>
        	<li><a href="/create">Create</a></li>
        	<li><a href="/saved">Saved</a></li>
        </ul>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
