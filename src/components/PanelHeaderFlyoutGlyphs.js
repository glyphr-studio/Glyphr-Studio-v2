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
      <div className="flyout-glyphs" id="flyout-secondary"
           style={this.props.isOpen ? {display: 'flex'} : {display: 'none'}}>
        <div className="controls">
          <button onclick="alert('search box for glyphs');">
            <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12">
              <path d="M7.5,0C5.015,0,3,2.015,3,4.5c0,0.987,0.327,1.892,0.866,2.634L0,11v1h1l3.866-3.866C5.608,8.673,6.513,9,7.5,9 C9.985,9,12,6.985,12,4.5S9.985,0,7.5,0z M7.5,7.6c-1.709,0-3.1-1.391-3.1-3.1s1.391-3.1,3.1-3.1s3.1,1.391,3.1,3.1 S9.209,7.6,7.5,7.6z"/>
            </svg>
          </button>
          <button onclick="alert('popout panel to a new window');">
            <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12">
              <polygon points="4,0.6 4,2 9,2 1,10 1,11 2,11 10,3 10,8 11.4,8 11.4,0.6 "/>
            </svg>
          </button>
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