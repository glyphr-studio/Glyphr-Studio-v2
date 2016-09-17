// import React
// import ReactRouter
import "../style/default/Panel";
import PanelHeader from "./PanelHeader";

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render() {
    return (
      <div className={this.props.className} onClick={this.onClick}>
          {this.props.children}
      </div>
    )
  }
})