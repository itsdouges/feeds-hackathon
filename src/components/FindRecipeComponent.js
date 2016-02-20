'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';
import structs from '../constants/structs';
import t from 'tcomb-form';

import '../styles/FindRecipe.less';

const IMAGE_URI = 'https://spoonacular.com/recipeImages/';

const Form = t.form.Form;
const FormSchema = t.struct({
  cuisine: t.maybe(t.enums(structs.cuisines)),
  diet: t.maybe(t.enums(structs.diets)),
  query: t.maybe(t.String),
  type: t.maybe(t.enums(structs.types))
});

class FindRecipeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        cuisine: '',
        diet: '',
        number: 10,
        query: '',
        type: ''
      }
    };

    this.resultsView = this.resultsView.bind(this);
  }

  search(e) {
    e.preventDefault();

    this.props.findRecipe(this.state.form);
  }

  resultsView() {
    const model = this.props.state.recipe;

    return model.results.length > 0 ?
      <ul>
        {
          model.results.map((recipe, i) => {
            return (
              <li key={i} className="recipe">
                <img src={IMAGE_URI + recipe.image} />
              </li>
            )
          })
        }
      </ul>
      : null;
  }

  onChange(value) {
    this.setState({form: value});
  }

  render() {
    return (
      <div className="findrecipe-component">
        <form>
          <Form
              type={FormSchema}
              value={this.state.form}
              onChange={this.onChange.bind(this)}
              />
          <button
              type="submit"
              onClick={this.search.bind(this)}
              className="btn btn-block btn-default">Search</button>
        </form>

        <div className="results">
          { this.resultsView() }
        </div>
      </div>
    );
  }
}

FindRecipeComponent.displayName = 'FindRecipeComponent';

// Uncomment properties you need
// FindRecipeComponent.propTypes = {};
// FindRecipeComponent.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FindRecipeComponent);
