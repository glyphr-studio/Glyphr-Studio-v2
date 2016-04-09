import React from "react";
import TabsNav from "./../PanelTabs/TabsNav";
import "./../../../style/default/Panel.scss";

export default React.createClass({
  render() {
    return (
      <div>
        <TabsNav/>
        <div className="navarea_panel">
          <div className="navarea_header">
            <h1 className="panelsupertitle">{this.props.title}</h1>
            <h1 className="paneltitle">{this.props.name}</h1>
          </div>

          <div className="panel_section" id="glyphchooser">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})