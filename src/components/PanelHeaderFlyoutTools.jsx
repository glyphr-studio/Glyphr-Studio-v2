import "./../style/default/PanelHeaderFlyout"
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";

export default React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool
  },
  props: {
    isOpen: false
  },
  render() {
    return (
      <div className="flyout-tools" id="flyout-tertiary"
           style={this.props.isOpen ? {display: 'flex'} : {display: 'none'}}>
        <div className="controls">
          <button onClick={this.props.toggle}>
            <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12">
              <polygon points="12,1 11,0 6,5 1,0 0,1 5,6 0,11 1,12 6,7 11,12 12,11 7,6 "/>
            </svg>
          </button>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
})