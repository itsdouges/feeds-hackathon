import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../../styles/views/Home.less';
import Logo from '../../images/cookbook-inverse.png';

class HomeComponent extends React.Component {
  render() {
    return (
      <div className="home">
      	<div className="hero-icon"></div>
        <h1 className="title-hero">feed</h1>

        <div className="home-actions" style={{textAlign:'center', fontSize: '1.2em'}}>
          <Link title="Find a recipe" to="/recipe/find"><i className="fa fa-search"></i> Find</Link>
          <Link title="Write a recipe" to="/recipe/create"><i className="fa fa-pencil"></i> Write</Link>
          <Link title="Favourite recipes" to="/recipe/saved"><i className="fa fa-heart"></i> Saved</Link>
          <Link title="Make a shopping list" to="/create-shopping-list"><span className="feed">feed</span> List</Link>
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
