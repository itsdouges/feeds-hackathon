'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import '../../styles/core/ContextStrip.less';

class ContextStripComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  getLoggedInContext() {
    const { state } = this.props;
    const auth = state.authentication;

    return (
      <div className="profile-context">
        <img src={auth.authData.google.profileImageURL} className="img-responsive profile-image" />
        <button className="link" style={{background: 'none', marginLeft: '0.3em', border: 'none', outline: 'none', fontSize: '1.3em'}} onClick={this.props.logout}>logout</button>
      </div>
    );
  }

  getLoggedOutContext() {
    return (
        <div className="profile-context">
          <button className="link" style={{background: 'none', border: 'none', outline: 'none', fontSize: '1.3em'}} onClick={this.props.login}>login</button>
        </div>
    );
  }

  render() {
    const { state } = this.props;
    const auth = state.authentication;

    return (
      <div className="context-strip">
        <div className="context-area left-context">
          <Link className="context-hero" to="/">feed</Link>
        </div>

        <div className="context-area right-context">
          {
            auth.authData ? this.getLoggedInContext() : this.getLoggedOutContext()
          }
        </div>
      </div>
    );
  }
}

ContextStripComponent.displayName = 'ContextStripComponent';

// Uncomment properties you need
// ContextStripComponent.propTypes = {};
// ContextStripComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContextStripComponent);
