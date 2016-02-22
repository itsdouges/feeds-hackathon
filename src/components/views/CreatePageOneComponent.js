'use strict';

import React from 'react';
import '../../styles/views/CreatePageOne.less';

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
		this.save(true);
		this.props.next();
	}

	validate () {
		const state = {
			errors: {},
		};

		const name = this.refs.title.value;
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

	save (validate) {
		console.log ('hey broo');

	    if (!validate || this.validate()) {
	      this.props.save({
	      	title: this.refs.title.value,
	      	description: this.refs.description.value,
	      }, true);
	    }
	}

	onChange () {
		this.props.setValid(this.validate());
	}

  render() {
    return (
      <div className="page">
        <form>       
        	<span className="recipe-description">Let's write down my </span>

          <input
          	className="recipe-description textbox"
          	autofocus
          	placeholder="Filet Mignon Flip.." 
          	defaultValue={this.props.data.title}
          	onChange={this.onChange.bind(this)} 
          	type="text" 
          	ref="title" />

          	<span  className="recipe-description"> <span className="feed">feed</span>,</span>
          	<br/>
          	<br/>
          	
          	<span className="recipe-description">it's a </span> 

          <input 
          	className="recipe-description textbox long"
          	placeholder="steak with a twist.."
          	defaultValue={this.props.data.description} 
          	onChange={this.onChange.bind(this)} 
          	type="text" 
          	ref="description" />
          	<span className="recipe-description">!</span> 
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
