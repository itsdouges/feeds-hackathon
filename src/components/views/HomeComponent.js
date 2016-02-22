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
        <h1 className="title-hero">feed</h1>
        <div className="sub-title">made for you</div>

        <div className="home-actions" style={{textAlign:'center', fontSize: '1.2em'}}>
          <Link title="Find a recipe" to="/recipe/find"><i style={{marginRight:'0.25em'}} className="fa fa-search"></i> find</Link>
          <Link title="Write a recipe" to="/recipe/create"><i style={{marginRight:'0.25em'}} className="fa fa-pencil"></i> write</Link>
          <Link title="Saved recipes" to="/recipe/saved"><i style={{marginRight:'0.25em'}} className="fa fa-heart"></i> save</Link>
          <Link title="Make a feed list" to="/create-shopping-list"><span className="feed">feed</span> list</Link>
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
