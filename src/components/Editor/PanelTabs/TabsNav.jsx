import React from "react";
import Tab from "./Tab";
import {Icons} from "./../../Icons";
import {config} from "./../../../config/config";
import {NavLink} from "./../../Navigation";
import "./../../../style/default/EditTabsNav";

export default React.createClass({
  getInitialState: function() {
    var _this = this;
    return {icons: Icons.panelTabs.tabsNav};
  },  
  getTabs() {
    var tabs = [],
        _this = this;
    Object.keys(_this.state.icons).map(function (key, value) {
      tabs.push(<NavLink key={value} activeClassName="active_tab" to={config.routes.project_editor_tab(key)}><Tab iconName={key}/></NavLink>)
    });

    return tabs;
  },
  render() {
    return (
      <div className="navarea_tabs">

        {this.getTabs()}

        <div style={{position: 'absolute', bottom: 15, left: 0, width: 70, textAlign: 'center', cursor: 'pointer'}}>
          <a href="#" style={{color: 'rgb(0,140,210)', fontSize: 18}}>give<br />back!</a>
        </div>
      </div>
    )
  }
})