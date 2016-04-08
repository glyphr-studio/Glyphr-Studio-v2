import React from "react";
import {Link} from "react-router";

export var NavLink = React.createClass({
  render() {
    return (
      <Link {...this.props} activeClassName="active">
        {this.props.children}
      </Link>
    )
  }
});