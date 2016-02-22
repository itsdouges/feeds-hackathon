'use strict';

import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/mapping';
import { connect } from 'react-redux';
import structs from '../../constants/structs';
import t from 'tcomb-form';

import RecipeList from './../RecipeListComponent';

import '../../styles/views/FindRecipe.less';

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
      <RecipeList recipes={model.results} />
      : null;
  }

  onChange(value) {
    this.setState({form: value});
  }

  componentDidUpdate(nextProps) {
    if ((this.props.state.recipe.results !== nextProps.state.recipe.results) && this._results) {
      this._results.scrollIntoView(true);
    }
  }

  render() {
    const { state } = this.props;

    return (
      <div className="findrecipe-component">
        <div className="search">
          <form>
            <Form
                type={FormSchema}
                value={this.state.form}
                onChange={this.onChange.bind(this)}
                options={FormOptions} />

            {
              state.recipe.loading ?
                <button
                  type="submit"
                  disabled
                  className="btn btn-block btn-default"><i className="fa fa-refresh fa-spin" /></button>
                    :
                <button
                  type="submit"
                  onClick={this.search.bind(this)}
                  className="btn btn-block btn-default"><i className="fa fa-search" /> Find</button>
              }
          </form>
        </div>

        <div className="results" ref={(c) => this._results = c}>
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
