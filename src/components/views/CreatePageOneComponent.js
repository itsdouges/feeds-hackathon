'use strict';

import React from 'react';

class PageOne extends React.Component {
	constructor () {
		super();
		console.log(this.props);
		this.state = {
			errors: {},
		};
	}

	done (e) {
		e.preventDefault();
		
	    if (this.validate()) {
	      this.props.save({
	      	name: this.refs.name.value,
	      	description: this.refs.description.value,
	      });
	    }
	}

	validate () {
		const state = {
			errors: {},
		};

		const name = this.refs.name.value;
		const description = this.refs.description.value;

		if (!name) {
			state.errors.name = 'required';
		}

		if (!description) {
			state.errors.description = 'required';
		}

		this.setState(state);

		return Object.keys(state.errors).length === 0;
	}

	onChange () {
		this.props.setValid(this.validate());
	}

  render() {
    return (
      <div className="page">
        <form>
        <h2>tell me about it</h2>

          <input 
          	placeholder="Name" 
          	defaultValue={this.props.data.name} 
          	onChange={this.onChange.bind(this)} 
          	type="text" 
          	ref="name" />

          	<br/>

          <input 
          	placeholder="Description"
          	defaultValue={this.props.data.description} 
          	onChange={this.onChange.bind(this)} 
          	type="text" 
          	ref="description" />

          <button
          	style={{display:'none'}}
              type="submit"
              onClick={this.done.bind(this)}
              className="btn btn-block btn-default">Hide Me</button>
        </form>
      </div>
    );
  }
}

PageOne.displayName = 'ViewsCreatePageOneComponent';

// Uncomment properties you need
// CreatePageOneComponent.propTypes = {};
// CreatePageOneComponent.defaultProps = {};

export default PageOne;
