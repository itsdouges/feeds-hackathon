'use strict';

import React from 'react';

import Description from './CreatePageOneComponent';
import Ingredients from './CreatePageTwoComponent';
import Steps from './CreatePageThreeComponent';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require('styles/views/Create.less');

class CreateComponent extends React.Component {
    constructor () {
        super();
        this.state = {
            current: 1,
            1: {
                valid: false,
                data: {},
            },
            2: {
                valid: false,
                data: {},
            },
            3: {
                valid: false,
                data: {},
            },
        };
    }

    canGoBack () {
        return this.state.current > 1;
    }

    canGoForward () {
        return this.state.current < 3 && this.state[this.state.current].valid;
    }

    next () {
        if (!this.canGoForward()) {
            return;
        }
        console.log('next page awayyy!');
        this.refs.page.save(true);

        const state = this.state;

        this.setState({
            ...state,
            current: ++state.current,
        });
    }

    back () {
        if (!this.canGoBack()) {
            return;
        }
        this.refs.page.save(false);

        const state = this.state;

        this.setState({
            ...state,
            current: --state.current,
        });
    }

    savePage (data, progress) {
        const state = {
            ...this.state,
            
        };

        state[state.current].data = data;

        this.setState(state);

        // if (progress && this.canGoForward()) {
        //     this.next();
        // }

        console.log('PAGE STATE', this.state);
    }

    setValid (valid) {
        const state = {
            ...this.state,
        };

        state[state.current].valid = valid;

        this.setState(state); 
    }

  render() {
    const back = this.canGoBack() && <a className="page-move left" onClick={this.back.bind(this)}>&lt;-</a>;
    const forward = this.canGoForward() && <a className="page-move right" onClick={this.next.bind(this)}>-&gt;</a>;

    let page;

    switch (this.state.current) {
        case 2:
            page = <Ingredients ref="page" next={this.next.bind(this)} data={this.state[2].data} key={2} setValid={this.setValid.bind(this)} save={this.savePage.bind(this)} />;
            break;

        case 3:
            page = <Steps ref="page" next={this.next.bind(this)} data={this.state[3].data} key={3} setValid={this.setValid.bind(this)} save={this.savePage.bind(this)} />;
            break;

        default:
            page = <Description ref="page" next={this.next.bind(this)} data={this.state[1].data} key={1} setValid={this.setValid.bind(this)} save={this.savePage.bind(this)} />;
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
            {back}
            {forward}
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
