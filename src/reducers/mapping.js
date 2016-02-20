'use strict';

import { bindActionCreators } from 'redux';
import * as authActions from './authentication/actions';
import * as recipeActions from './recipes/actions';

export function mapStateToProps(state) {
  return { state: state };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...authActions,
    ...recipeActions
  }, dispatch);
}
