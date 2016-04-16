// import React
import "./../../../style/default/PanelSection";

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },
  render() {
    return (
      <div className="panel-section">
        <h1 className="panel-title">{this.props.title}</h1>
        <div className="actionsarea">
          {this.props.children}
        </div>
      </div>
    )
  }
})