// import React
import "../style/default/PanelField";
import PanelInput from "./PanelInput";

export default React.createClass({
  render() {
    return (
      <div className="panel-field">
        <h3>{this.props.title}</h3>
        <div>
          {this.props.children}
          <PanelInput></PanelInput>
        </div>
      </div>
    )
  }
});