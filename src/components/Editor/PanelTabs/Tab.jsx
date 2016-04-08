import React from "react";
import {Icons} from "./../../Icons";

export default React.createClass({
  getInitialState() {
    return {icons: Icons};
  },
  render() {
    return (
      <div>
        <div className="np_section" onClick={this.setActiveTag} title={this.props.iconName}>
          {/* ActiveTag.setTag({tag: this.props.iconName}) */}
          <button>{this.state.icons.panel_tabs[this.props.iconName]}</button>
        </div>
      </div>
    )
  }
})