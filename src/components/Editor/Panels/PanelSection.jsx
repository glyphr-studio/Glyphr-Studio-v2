import React from "react";

export default React.createClass({
  render() {
    return (
      <div className="panel_section">
        <h1 className="paneltitle">{this.props.title}</h1>
        <div className="actionsarea">
          {this.props.children}
        </div>
      </div>
    )
  }
})