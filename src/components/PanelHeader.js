import "./../style/default/PanelHeader";
import PanelHeaderFlyoutPages from "./PanelHeaderFlyoutPages";
import PanelHeaderFlyoutGlyphs from "./PanelHeaderFlyoutGlyphs";
import PanelHeaderFlyoutTools from "./PanelHeaderFlyoutTools";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
var flyouteu = new PluginEventUnit("flyout", 3);

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    customFlyout: React.PropTypes.bool,
    isFlyoutOpen: React.PropTypes.bool,
    flyoutType: React.PropTypes.string
  },
  toggleFlyout() {
    flyouteu.emit("toggle", this);
  },
  componentDidMount() {
    var _this = this;

    flyouteu.on("flyout.toggle", (emitSource) => {
      // Close all other flyouts and toggle yourself
      if(emitSource === _this) _this.setState({isFlyoutOpen: !_this.state.isFlyoutOpen});
      else _this.setState({isFlyoutOpen: false});
    });
  },
  getInitialState() {
    return ({
      isFlyoutOpen: this.props.isFlyoutOpen || false
    })
  },
  getFlyout() {
    switch(this.props.flyoutType) {
      case "tools":
        return(
          <PanelHeaderFlyoutTools isOpen={this.state.isFlyoutOpen} toggle={this.toggleFlyout}>
            {this.props.children}
          </PanelHeaderFlyoutTools>
        );
      case "glyphs":
        return(
          <PanelHeaderFlyoutGlyphs isOpen={this.state.isFlyoutOpen} toggle={this.toggleFlyout}>
            {this.props.children}
          </PanelHeaderFlyoutGlyphs>
        );
      case "pages":
        return (
          <PanelHeaderFlyoutPages isOpen={this.state.isFlyoutOpen} toggle={this.toggleFlyout}>
            {this.props.children}
          </PanelHeaderFlyoutPages>
        );
      default:
        return (
          <PanelHeaderFlyoutPages isOpen={this.state.isFlyoutOpen} toggle={this.toggleFlyout}>
            !!! BAD FLYOUT TYPE !!!
          </PanelHeaderFlyoutPages>
        );
    };
  },
  getFlyoutIcon(data){
    switch(this.props.flyoutType) {
      case "tools":
        return(
          <svg x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12">
            <g>
              <rect x="0" width="3" height="1"/>
              <rect x="4" width="8" height="1"/>
              <rect x="0" y="2" width="3" height="1"/>
              <rect x="4" y="2" width="8" height="1"/>
              <rect x="0" y="4" width="3" height="1"/>
              <rect x="4" y="4" width="8" height="1"/>
              <rect x="0" y="6" width="3" height="1"/>
              <rect x="4" y="6" width="8" height="1"/>
              <rect x="0" y="8" width="3" height="1"/>
              <rect x="4" y="8" width="8" height="1"/>
              <rect x="0" y="10" width="3" height="1"/>
              <rect x="4" y="10" width="8" height="1"/>
            </g>
          </svg>
        );
      case "glyphs":
        return(
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 1000 1000">
            <rect x="0" y="0" width="1000" height="1000" fill="#C0E9FD"></rect>
            <path  d={data.glyphs[data.selectedGlyph].svgPathData}/>
          </svg>
        );
      case "pages":
        return (
          <svg style={{width: 20, height: 20}} x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
            <path d="M25,1c10.517,0,16.363,0,20.182,3.818S49,14.483,49,25s0,16.363-3.818,20.182
                          S35.517,49,25,49S8.637,49,4.818,45.182S1,35.517,1,25S1,8.637,4.818,4.818S14.483,1,25,1 M25,0.5c-10.685,0-16.57,0-20.535,3.965
                          C0.5,8.43,0.5,14.315,0.5,25s0,16.57,3.965,20.535C8.43,49.5,14.315,49.5,25,49.5s16.57,0,20.535-3.965
                          C49.5,41.57,49.5,35.685,49.5,25s0-16.57-3.965-20.535C41.57,0.5,35.685,0.5,25,0.5L25,0.5z"/>
            <path d="M39.5,20.884c0-5.518-2.421-9.955-6.817-12.493c-4.667-2.694-10.698-2.694-15.366,0c-4.396,2.538-6.817,6.975-6.816,12.493
                          c0,3.309,1.694,6.185,4.77,8.099c2.593,1.612,6.048,2.501,9.73,2.501c4.241,0,8.669-1.232,11.5-3.824v5.358
                          c0,5.222-5.961,7.601-11.5,7.601c-4.978,0-10.296-1.921-11.323-6.101h1.79v-3H10.5v1.5c0,3.309,1.694,6.185,4.77,8.099
                          c2.593,1.613,6.048,2.502,9.73,2.502c6.984,0,14.5-3.317,14.5-10.601L39.5,20.884L39.5,20.884z M25,28.483
                          c-5.539,0-11.5-2.378-11.5-7.6c0-4.401,1.888-7.915,5.316-9.895c3.698-2.135,8.668-2.135,12.366,0
                          c3.429,1.979,5.317,5.494,5.317,9.895h0C36.5,26.105,30.539,28.483,25,28.483z"/>
          </svg>
        );
    };
  },
  render() {
    return (
      <div className={this.props.className}>
        <div className="bar" onClick={this.toggleFlyout}>
          <div className="icon">
            {this.getFlyoutIcon(this.props.data)}
          </div>
          <div className="title">{this.props.title}</div>
          <div className="chevron">
            <svg x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16">
              <polygon points="1,15.707 0.293,15 7.293,8 0.293,1 1,0.293 8.707,8"/>
            </svg>
          </div>
        </div>
        {this.getFlyout()}
      </div>
    )
  }
})