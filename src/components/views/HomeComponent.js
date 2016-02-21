import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../../styles/views/Home.less';

class HomeComponent extends React.Component {
  render() {
    return (
      <div className="home">
      	<div className="hero-icon"></div>
        <h1 className="title-hero">feed</h1>

        <div className="home-actions">
        	<Link to="/recipe/find">Find</Link>
        	<Link to="/recipe/create">Create</Link>
        	<Link to="/recipe/saved">My Recipes</Link>
          <Link to="/create-shopping-list">Create a Shopping List</Link>
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
