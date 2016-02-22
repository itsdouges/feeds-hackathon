'use strict';

import React from 'react';
import RecipeCard from './RecipeCardComponent';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('styles//CreateListView.less');

class CreateListViewComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			selected: {}
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

	finish () {
		// console.log(this.state.selected);

    const genIngredients = {};

    for (const key in this.state.selected) {
      const count = this.state.selected[key];
      const id = key;

      const recipe = this.props.state.recipe.localRecipes[id] || this.props.state.recipe.onlineRecipes[id];
      const ingredients = recipe.extendedIngredients || recipe.ingredients;
      // console.log(ingredients);

      ingredients.forEach((ingredient) => {
        if (!genIngredients[ingredient.name]) {
          genIngredients[ingredient.name] = {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount * count,
          };
        }
      });
    }

    console.log();

    this.setState({
      generated: genIngredients,
      genSelected: this.state.selected,
    });
	}

	isSelected (id) {
		return this.state.selected[id] >= 0;
	}

  render() {
    console.log(this.props.state);

    const items = {
      ...this.props.state.recipe.localRecipes,
      ...this.props.state.recipe.onlineRecipes
    };

    let recipes;

    if (Object.keys(items).length > 0) {
      recipes = [];

      for (const key in items) {
        const recipe = items[key];

        recipes.push(
          <div className={this.isSelected.call(this,recipe.id) ? 'selected' : ''} key={key} onClick={(e) => { e.preventDefault(); this.add.call(this, recipe.id); }} style={{cursor:'pointer'}}>
            <RecipeCard hideImage={true} isLocal={!recipe.image} noLink={true} recipe={recipe} />
          </div>
        );
      }
    }

    if (this.state.generated && Object.keys(this.state.generated).length > 0) {
      const stuff = [];

      for (const key in this.state.generated) {
        const item = this.state.generated[key];

        stuff.push(
          <div key={key}><span className="recipe-description">{`${item.amount} ${item.unit} of ${item.name}`}</span></div>
        );
      }

    let genSelected;

    for (const key in this.state.genSelected) {
      if (!genSelected) {
        genSelected = [];
      }

      const count = this.state.genSelected[key];
      const recipe = items[key];

      genSelected.push(
        <div key={key}>
          <span className="recipe-description">{count} x {recipe.title}</span>
        </div>
    );
    }


      return (
        <div className="page">
          <div>
          <span className="recipe-description">Buy these ingredients</span><br/><br/>
          {stuff}

          <br/><br/><span className="recipe-description">For these meals</span><br/><br/>
          {genSelected}
          </div>
        </div>
      );
    }

    const message = <span className="recipe-description">No recipes? Go <Link className="btn-link" to="/recipe/find">find</Link> and <Link className="btn-link" to="/recipe/create">create</Link> some :-)</span>;

  	if (!recipes) {
  		return (
      <div className="page">
        <div style={{textAlign: 'center'}}>
        <div><span className="recipe-description">Let's make your <span className="feed">feed</span> list for the week!</span><br/><br/></div>
        {message}
        </div>
      </div>);
  	}

  	let selected;

  	for (const key in this.state.selected) {
  		if (!selected) {
  			selected = [];
  		}

  		const count = this.state.selected[key];
  		const recipe = items[key];

  		selected.push(
  			<div key={key}>
  				<span className="recipe-description">{count} x {recipe.title}</span>
  				<a className="icon-button" onClick={this.remove.bind(this, key)}><i className="fa fa-times"></i></a>
  			</div>
		);
  	}

  	const finish = Object.keys(this.state.selected).length > 0 && <div style={{textAlign: 'right', marginTop:'1em'}}><a className="feed-me" style={{marginRight:'1em'}} onClick={this.finish.bind(this)}>feed me</a></div>;

    return (
      <div style={{height: '100%'}}>
        <div style={{height: '74%'}}>
      		<div className="page">
      			<div>
              <span className="recipe-description">Let's make your <span className="feed">feed</span> list for the week!</span><br/><br/>
            
      			 {selected}
             {finish}
            </div>
    		  </div>
          </div>
       <div className="no-shrink" style={{background: '#388E3C', display: 'flex', overflow: 'auto', alignItems: 'flex-start', height: '22%', width: '100%' }}>
          {recipes}
        </div>
      </div>
    );
  }
}

CreateListViewComponent.displayName = 'CreateListViewComponent';

// Uncomment properties you need
// CreateListViewComponent.propTypes = {};
// CreateListViewComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListViewComponent);
