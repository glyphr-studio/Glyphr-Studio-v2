import PanelHeader from "./PanelHeader";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
let flyouteu = new PluginEventUnit("flyout", 3);
import style from "./../style/default/PanelHeaderFlyout";

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    className: React.PropTypes.string.isRequired,
    icon: React.PropTypes.element
  },
  render() {
    return (
      <PanelHeader id={this.props.id} title={this.props.title} icon={this.props.icon} className={this.props.className}>
        <style>{`${style}`}</style>
        <div className="flyout flyout-tools flyout-pagechoice" id="flyout-tertiary">
          <div className="controls">
            <button onClick={flyouteu.emit.bind(flyouteu, "close", this.props.id)}>
              <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12">
                <polygon points="12,1 11,0 6,5 1,0 0,1 5,6 0,11 1,12 6,7 11,12 12,11 7,6 "/>
              </svg>
            </button>
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </PanelHeader>
    );
  }
})