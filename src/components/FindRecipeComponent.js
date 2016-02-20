'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../reducers/mapping';
import { connect } from 'react-redux';
import structs from '../constants/structs';
import t from 'tcomb-form';

import RecipeCard from './RecipeCardComponent';

import '../styles/FindRecipe.less';

const Form = t.form.Form;
const FormSchema = t.struct({
  query: t.maybe(t.String),
  cuisine: t.maybe(t.enums(structs.cuisines)),
  diet: t.maybe(t.enums(structs.diets)),
  type: t.maybe(t.enums(structs.types))
});
const FormOptions = {
  fields: {
    query: {
      label: 'Search',
      attrs: {
        placeholder: 'Enter search criteria'
      }
    },
    cuisine: {
      nullOption: { value: '', text: 'Choose a cuisine' },
      label: 'Cuisine'
    },
      diet: {
      nullOption: { value: '', text: 'Choose a diet' },
      label: 'Diet'
    },
    type: {
      nullOption: { value: '', text: 'Choose a type' },
      label: 'Type'
    }
  }
};

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
              <li key={i}>
                <RecipeCard recipe={recipe} />
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
    const { state } = this.props;

    return (
      <div className="findrecipe-component">
        <div className="hero-icon">
          <i className="fa fa-search" />
        </div>

        <form>
          <Form
              type={FormSchema}
              value={this.state.form}
              onChange={this.onChange.bind(this)}
              options={FormOptions} />

          <button
              type="submit"
              onClick={this.search.bind(this)}
              className="btn btn-block btn-default">Search</button>
        </form>

        <div className="results">
          { state.recipe.loading ? <i className="fa fa-refresh fa-spin loading" /> : this.resultsView() }
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
