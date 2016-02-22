'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import RecipeBadge from './../RecipeBadgeComponent';
import Instructions from './../InstructionsComponent';

import '../../styles/views/ViewRecipe.less';

class ViewLocalRecipeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: null
    };

    this.removeRecipe = this.removeRecipe.bind(this);
  }

  componentDidMount() {
    this.setState({
      recipe: this.props.state.recipe.localRecipes[this.props.params.recipeId]
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.state.recipe.localRecipes[this.props.params.recipeId] && !this.state.recipe) {
      this.setState({
        recipe: this.props.state.recipe.localRecipes[this.props.params.recipeId]
      });
    }
  }

  removeRecipe(recipe) {
    this.props.removeLocalRecipe(recipe);
    hashHistory.push('/recipe/saved');
  }

  getRecipeView() {
    const { state } = this.props;
    const recipe = this.state.recipe;
    const savedRecipe = recipe ? (state.recipe.localRecipes[recipe.id] ? true : false) : false;

    return recipe ?
        <div className="recipe">
          <div className="image-slider" style={{ background: 'url(\'https://spoonacular.com/recipeImages/default.png\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>

          <div className="recipe-info">
            <div className="text-center">
              <button className={ 'btn ' + (savedRecipe ?  'btn-danger' : 'btn-success') } onClick={ () => savedRecipe ? this.removeRecipe(recipe) : this.props.addLocalRecipe(recipe) }>
                <i className="fa fa-heart" />
              </button>
              <h2>{ recipe.title }</h2>
              It's a "<i>{recipe.description}</i>"!
            </div>
            <RecipeBadge recipe={recipe} />
            <ul>
              {
                recipe ? recipe.ingredients.map((ingredient,i) => {
                  return <li key={i}>{ ingredient.amount + ' ' + ingredient.unit + ' of ' + ingredient.name }</li>
                }) : null
              }
            </ul>
            <Instructions steps={ recipe.steps.join('.') } />
          </div>
        </div> : null;
  }

  render() {
    return (
        <div className="viewlocalrecipe-component viewrecipe-component">
          { this.state.recipe ? this.getRecipeView() : <i className="fa fa-refresh fa-spin loading" /> }
        </div>
    );
  }
}

ViewLocalRecipeComponent.displayName = 'ViewLocalRecipeComponent';

// Uncomment properties you need
// ViewRecipeComponent.propTypes = {};
// ViewRecipeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLocalRecipeComponent);
