'use strict';

import React from 'react';
import RecipeCard from './RecipeCardComponent';

require('styles//CreateListView.less');

class CreateListViewComponent extends React.Component {
	constructor () {

		super();
		this.state = {
			selected: {},
			items: [{
				id: 1,
				title: 'chocolate pudding',
				description: 'a cool meal to eat..'
			},{
				id: 2,
				title: 'a cool cake',
				description: 'a cool meal to feet..'
			},{
				id: 3,
				title: 'mignon steak',
				description: 'a cool meal to FORGET ABOUT IT!..'
			},{
				id: 4,
				title: 'chocolate pudding',
				description: 'a cool meal to eat..'
			},{
				id: 5,
				title: 'a cool cake',
				description: 'a cool meal to feet..'
			},{
				id: 6,
				title: 'mignon steak',
				description: 'a cool meal to FORGET ABOUT IT!..'
			},{
				id: 7,
				title: 'chocolate pudding',
				description: 'a cool meal to eat..'
			},{
				id: 8,
				title: 'a cool cake',
				description: 'a cool meal to feet..'
			},{
				id: 9,
				title: 'mignon steak',
				description: 'a cool meal to FORGET ABOUT IT!..'
			},{
				id: 10,
				title: 'chocolate pudding',
				description: 'a cool meal to eat..'
			},{
				id: 11,
				title: 'a cool cake',
				description: 'a cool meal to feet..'
			},{
				id: 12,
				title: 'hmm ahh..',
				description: 'a cool meal to FORGET ABOUT IT!..'
			},{
				id: 13,
				title: 'nothing really :)',
				description: 'a cool meal to eat..'
			},{
				id: 14,
				title: 'another sandwhich',
				description: 'a cool meal to feet..'
			},{
				id: 15,
				title: 'a sandwhich',
				description: 'a cool meal to FORGET ABOUT IT!..'
			}]
		};
	}

	remove (id) {
		const state = this.state;
		if (state.selected[id] === 1) {
			delete state.selected[id];
		} else {
			state.selected[id] = state.selected[id] - 1;
		}

		this.setState(state);
	}

	add (id) {

		const state = this.state;

		if (!state.selected[id]) {
			state.selected[id] = 1;
		} else {
			state.selected[id] = state.selected[id] + 1;
		}


		this.setState(state);
	}

	finish (){
		console.log(this.state.selected);
	}

	isSelected (id) {
		return this.state.selected[id] >= 0;
	}

  render() {
  	const recipes = this.state.items && this.state.items.map((recipe, index) => {
  		return (
  			<div className={this.isSelected.call(this,recipe.id) ? 'selected' : ''} key={index} onClick={(e) => { e.preventDefault(); this.add.call(this, recipe.id); }} style={{cursor:'pointer'}}>
  				<RecipeCard hideImage={true} recipe={recipe} />
  			</div>
		);
  	});

  	if (!recipes) {
  		return (
  			<span>loading..</span>
		);
  	}

  	let selected;

  	for (const key in this.state.selected) {
  		if (!selected) {
  			selected = [];
  		}

  		const count = this.state.selected[key];
  		const recipe = this.state.items.filter(item => {
  			return item.id == key;
  		})[0];

  		selected.push(
  			<div key={key}>
  				<span className="recipe-description">{recipe.title} x{count}</span>
  				<a className="icon-button" onClick={this.remove.bind(this, key)}><i className="fa fa-times"></i></a>
  			</div>
		);
  	}

  	const finish = Object.keys(this.state.selected).length > 0 && <a className="page-move right finish" style={{marginRight:'1em'}} onClick={this.finish.bind(this)}><i className="fa fa-check"></i></a>;

    return (
      <div className="page">
  		<div style={{background: 'blue', display: 'flex', overflow: 'auto', alignItems: 'center', position: 'fixed', bottom: '0', left: '0', right: '0' }}>
  			{recipes}
  		</div>

  		<div style={{margin: '5em 0', height: '90%', overflow: 'auto'}}>
  			<div><span className="recipe-description">This week we'll have..</span><br/><br/></div>
			{selected}
		</div>

		{finish}
      </div>
    );
  }
}

CreateListViewComponent.displayName = 'CreateListViewComponent';

// Uncomment properties you need
// CreateListViewComponent.propTypes = {};
// CreateListViewComponent.defaultProps = {};

export default CreateListViewComponent;
