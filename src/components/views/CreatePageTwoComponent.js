'use strict';

import React from 'react';
import IngredientList from '../IngredientListComponent';

class PageTwo extends React.Component {
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
        	<h2>ingredients</h2>

        	<IngredientList />

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

PageTwo.displayName = 'ViewsCreatePageOneComponent';

// Uncomment properties you need
// CreatePageOneComponent.propTypes = {};
// CreatePageOneComponent.defaultProps = {};

export default PageTwo;
