'use strict';

import React from 'react';

import PageOne from './CreatePageOneComponent';
import PageTwo from './CreatePageTwoComponent';
import PageThree from './CreatePageThreeComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('styles/views/Create.less');

class CreateComponent extends React.Component {
    constructor () {
        super();
        this.state = {
            current: 1,
            1: {
                valid: false,
            },
            2: {
                valid: false,
            },
            3: {
                valid: false,
            },
        };
    }

    setPage (page) {
        this.setState({
            ...this.getState(),
            current: page,
        });
    }

    next () {
        // if current page valid, allow movement
        
        if (this.state.current < 3) {
            const state = this.state;

            this.setState({
                ...state,
                current: ++state.current,
            });
        }
    }

    back () {
        // if current page valid, allow movement

        if (this.state.current > 1) {
            const state = this.state;

            this.setState({
                ...state,
                current: --state.current,
            });
        }
    }

    setValid () {

    }

  render() {
    let page;

    switch (this.state.current) {
        case 2:
            page = <PageTwo key={2} setValid={this.setValid.bind(this)} />;
            break;

        case 3:
            page = <PageThree key={3} setValid={this.setValid.bind(this)} />;
            break;

        default:
            page = <PageOne key={1} setValid={this.setValid.bind(this)} />;
            break;
    }

    return (
      <div className="create">
        <div className="pages">
            <ReactCSSTransitionGroup
                transitionName="create-page"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={200}>
                {page}
            </ReactCSSTransitionGroup>
        </div>

        <div className="page-actions">
            <a className="page-move left" onClick={this.back.bind(this)}>&lt;-</a>
            <a className="page-move right" onClick={this.next.bind(this)}>-&gt;</a>
        </div>
      </div>
    );
  }
}

CreateComponent.displayName = 'ViewsCreateComponent';

// Uncomment properties you need
// CreateComponent.propTypes = {};
// CreateComponent.defaultProps = {};

export default CreateComponent;
