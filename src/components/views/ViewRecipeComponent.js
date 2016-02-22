'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';

import RecipeBadge from './../RecipeBadgeComponent';
import Instructions from './../InstructionsComponent';

import '../../styles/views/ViewRecipe.less';

class ViewRecipeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loadedWebsite: false
    };

    this.getRecipeView = this.getRecipeView.bind(this);
  }

  componentDidMount() {
    this.props.viewRecipe(this.props.params.recipeId);
  }

  componentDidUpdate() {
    let recipe = this.props.state.recipe.viewRecipe;
    if (!this.state.loadedWebsite && recipe) {
      this.props.extractWebsite(recipe.sourceUrl);
      this.setState({
        loadedWebsite: true
      });
    }
  }

  getRecipeView() {
    const { state } = this.props;
    const recipe = state.recipe.viewRecipe;
    const website = state.recipe.websiteRecipe;
    const savedRecipe = recipe ? (state.recipe.onlineRecipes[recipe.id] ? true : false) : false;

    const buttonText = savedRecipe ? <span /> : <span style={{color: 'white',fontSize: '1.2em', margin: '0.5em 1em 0.5em 0.5em'}}>{savedRecipe ? '' : 'Like it? Save it!'}</span>;

    return recipe ?
      <div className="recipe">
        <div className="image-slider" style={{ position:'relative', background: 'url(\'' + recipe.image + '\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
           <div style={{position: 'absolute',bottom:'0',right:'0', padding: '1em', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              {buttonText}
              <button title={savedRecipe ? 'Loved' : 'Like it? Save it!'} className={ 'btn ' + (savedRecipe ?  'btn-danger' : 'btn-success') } onClick={ () => savedRecipe ? this.props.removeOnlineRecipe(recipe) : this.props.addOnlineRecipe(recipe) }>
                <i className="fa fa-heart" />
              </button>
            </div>
        </div>

        <div className="recipe-info">
          <div className="text-center">
            <h2>{ recipe.title }</h2>
          </div>

          <RecipeBadge recipe={recipe} />

          <ul>
            {
                recipe.extendedIngredients.map((ingredient,i) => {
                  return <li key={i}>{ ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name }</li>
                })
            }
          </ul>
          { website ? (state.recipe.loadingWebsite ? <i className="fa fa-refresh fa-spin loading" /> : <Instructions steps={ website.text } />) : null }
        </div>
      </div> : null;
  }

  render() {
    const { state } = this.props;

    return (
      <div className="viewrecipe-component">
        { !state.recipe.loading ? this.getRecipeView() : <i className="fa fa-refresh fa-spin loading" /> }
      </div>
    );
  }
}

ViewRecipeComponent.displayName = 'ViewRecipeComponent';

// Uncomment properties you need
// ViewRecipeComponent.propTypes = {};
// ViewRecipeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipeComponent);
