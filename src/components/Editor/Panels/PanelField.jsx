import React from "react";
import "./../../../style/default/PanelField";

export default React.createClass({
  render() {
    return (
      <div className="panel-field">
        <h3>{this.props.title}</h3>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});