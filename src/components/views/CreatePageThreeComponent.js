'use strict';

import React from 'react';

class PageThree extends React.Component {
	done (e) {
		e.preventDefault();

		const value = this.refs.name.value;
	    if (value) {
	      this.props.save({
	      	name: this.refs.name.value,
	      });
	    }
	}

	onChange () {

		const value = this.refs.name.value;

		if (value) {
			this.props.setValid(true);
			return;
		}

		this.props.setValid(false);
	}

  render() {
  	console.log(this.props);

    return (
      <div className="page">
      Steps
        <form>
          <input defaultValue={this.props.data.name} onChange={this.onChange.bind(this)} type="text" ref="name" />

          <button
          	style={{opacity:0,height: '0px'}}
              type="submit"
              onClick={this.done.bind(this)}
              className="btn btn-block btn-default">Hide Me</button>
        </form>
      </div>
    );
  }
}

PageThree.displayName = 'ViewsCreatePageOneComponent';

// Uncomment properties you need
// CreatePageOneComponent.propTypes = {};
// CreatePageOneComponent.defaultProps = {};

export default PageThree;
