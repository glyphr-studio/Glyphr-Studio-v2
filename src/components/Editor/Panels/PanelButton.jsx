import React from "react";

export default React.createClass({
  render() {
    return (
      <button title={this.props.title} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    )
  }
})