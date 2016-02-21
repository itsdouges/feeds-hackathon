'use strict';

import React from 'react';

import '../styles/RecipeBadge.less';

class RecipeBadgeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipebadge-component">
        { this.props.recipe.vegetarian ? <span className="badge">vegetarian</span> : null }
        { this.props.recipe.vegan ? <span className="badge">vegan</span> : null }
        { this.props.recipe.glutenFree ? <span className="badge">gluten free</span> : null }
        { this.props.recipe.dairyFree ? <span className="badge">dairy free</span> : null }
        { this.props.recipe.veryHealthy ? <span className="badge">very healthy</span> : null }
      </div>
    );
  }
}

RecipeBadgeComponent.displayName = 'RecipeBadgeComponent';

// Uncomment properties you need
RecipeBadgeComponent.propTypes = {
  recipe: React.PropTypes.object
};
// RecipeBadgeComponent.defaultProps = {};

export default RecipeBadgeComponent;
