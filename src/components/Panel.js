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
      <div className="panel" onClick={this.onClick}>
          {this.props.children}
      </div>
    )
  }
})