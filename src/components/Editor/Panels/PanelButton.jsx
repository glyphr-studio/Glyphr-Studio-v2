import React from "react";
import "./../../../style/default/PanelButton";

export default React.createClass({
  render() {
    return (
      <button className="panel-button" title={this.props.title} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    )
  }
})