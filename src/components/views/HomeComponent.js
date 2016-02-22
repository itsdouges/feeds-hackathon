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

        <div className="home-actions" style={{textAlign:'center', fontSize: '1.2em'}}>
          <Link to="/recipe/create"><div><i className="fa fa-paper-plane-o"></i></div> Add Recipe</Link>
        	<Link to="/recipe/find"><div><i className="fa fa-search"></i></div> Find Recipes</Link>
        	<Link to="/recipe/saved"><div><i className="fa fa-heart-o"></i></div> My Recipes</Link>
          <Link to="/create-shopping-list"><div><i className="fa fa-file-text-o"></i></div> Make a Shopping List</Link>
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
