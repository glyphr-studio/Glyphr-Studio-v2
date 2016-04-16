// import React
import {Icons} from "./../../Icons";

export default React.createClass({
  getInitialState() {
    return {icons: Icons.panelTabs.tabsNav};
  },
  render() {
    return (
      <div>
        <div className="np_section" onClick={this.setActiveTag} title={this.props.iconName}>
          {/* ActiveTag.setTag({tag: this.props.iconName}) */}
          <button>{this.state.icons[this.props.iconName]}</button>
        </div>
      </div>
    )
  }
})