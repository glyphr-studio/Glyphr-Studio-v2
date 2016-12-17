import "./../style/default/PanelHeader";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
import {storage} from "./../lib/storage/Storage";
let flyouteu = new PluginEventUnit("flyout", 3);

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    isFlyoutOpen: React.PropTypes.bool,
    flyoutType: React.PropTypes.string
  },
  toggleFlyout() {
    flyouteu.emit("toggle", this.props.id);
    if(this.state.isFlyoutOpen) myStorage.resetOpenFlyoutId();
    else myStorage.setOpenFlyoutId(this.props.id);
  },
  closeFlyout() {
    flyouteu.emit("close", this.props.id);
  },
  componentDidMount() {
    let _this = this;

    flyouteu.on("flyout.toggle", (id) => {
      // Close all other flyouts and toggle yourself
      if(id === _this.props.id) _this.setState({isFlyoutOpen: !_this.state.isFlyoutOpen});
      else _this.setState({isFlyoutOpen: false});
    });

    flyouteu.on("flyout.close", (id) => {
      if(id === _this.props.id) {
        _this.setState({isFlyoutOpen: false});
        myStorage.resetOpenFlyoutId();
      }
    });

    if(myStorage.getOpenFlyoutId() === this.props.id) _this.setState({isFlyoutOpen: !_this.state.isFlyoutOpen});
  },

  getInitialState() {
    return ({
      isFlyoutOpen: this.props.isFlyoutOpen || false
    })
  },
  render() {
    let _this = this;
    return (
      <div className={this.props.className}>

        <div className="bar" onClick={this.toggleFlyout}>
          <div className="icon">
            {this.props.icon}
          </div>
          <div className="title">{this.props.title}</div>
          <div className="chevron">
            <svg x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16">
              <polygon points="1,15.707 0.293,15 7.293,8 0.293,1 1,0.293 8.707,8"/>
            </svg>
          </div>
        </div>

        <div style={this.state.isFlyoutOpen ? {display: 'flex'} : {display: 'none'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

class PanelHeaderStorage {
  _path = {
    input (x) {
      return ['panelHeaderStorage', x].join('.').replace(/[ -]/g, '_');
    }
  };

  set(x, value) {
    storage.set(this._path.input(x), value);
  }

  get(x) {
    return storage.get(this._path.input(x));
  }

  setOpenFlyoutId(id) {
    this.set("openFlyoutId", id);
    return this;
  }

  getOpenFlyoutId() {
    return this.get("openFlyoutId");
  }

  resetOpenFlyoutId() {
    this.set("openFlyoutId", null);
  }
}

let myStorage = new PanelHeaderStorage();