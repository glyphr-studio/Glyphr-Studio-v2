import PanelHeader from "./PanelHeader";
import style from "./../style/default/Panel.scss";

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render() {
    return (
      <div>
        <style>{`${style}`}</style>
        <div className={this.props.className} onClick={this.handleClick} data={this.props.data}>
          {this.props.children}
        </div>
      </div>
    )
  }
})