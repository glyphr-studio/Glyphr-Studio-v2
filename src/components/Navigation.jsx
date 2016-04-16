// import React
// import ReactRouter

export var NavLink = React.createClass({
  render() {
    return (
      <Link {...this.props} activeClassName="active">
        {this.props.children}
      </Link>
    )
  }
});