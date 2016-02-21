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
      generated: genIngredients
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
            <RecipeCard hideImage={true} noLink={true} recipe={recipe} />
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

      return (
        <div className="page">
          <div>
          <span className="recipe-description">My shopping list</span><br/><br/>
          {stuff}

          <br/>
          <br/>
          <span className="recipe-description">Now time to print it off and go shopping!</span>
          </div>
        </div>
      );
    }

    const message = <span>Need more recipes? Why not <Link className="btn-link" to="/recipe/find">find</Link> or <Link className="btn-link" to="/recipe/create">create</Link> some :-)</span>;

  	if (!recipes) {
  		return (<div className="page">{message}</div>);
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
  				<span className="recipe-description">{recipe.title} x {count}</span>
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

    		<div style={{margin: '5em 0', paddingBottom: '10em', height: '100%', overflow: 'auto'}}>
    			<div><span className="recipe-description">Now what shall I pick..</span><br/><br/></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateListViewComponent);
