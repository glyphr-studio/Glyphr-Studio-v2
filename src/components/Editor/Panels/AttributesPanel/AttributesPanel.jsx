import React from "react";
import Panel from "./../Panel";

export default React.createClass({
  render() {
    return (
      <Panel panelName="Attributes">
        <h2>{this.props.params.sign}</h2>
      </Panel>
    )
  }
})