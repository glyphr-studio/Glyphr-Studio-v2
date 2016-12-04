import "./../style/default/Panel";
import PanelTrayAttributes from "./PanelTrayAttributes";
import PanelTrayHistory from "./PanelTrayHistory";
import PanelTrayView from "./PanelTrayView";
import PanelTrayShapes from "./PanelTrayShapes";
import PanelTrayActions from "./PanelTrayActions";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
let ptee = new PluginEventUnit("panelTray", 3);
import {storage} from "./../lib/storage/Storage";

export default React.createClass({
  propTypes: {
    selectedTray: React.PropTypes.string
  },
  componentDidMount() {
    let _this = this;
    ptee.on("panelTray.setTray", function(tray) {
      _this.setState({selectedTray: tray});
      myStorage.set("selectedTray", tray);
      ptee.emit("trayRedraw", tray);
    });
  },
  getInitialState() {
    return {
      selectedTray: myStorage.get("selectedTray") || "attributes"
    };
  },
  render() {
    return (
      <div className="panel-tray">
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})

class PanelTrayStorage {
  _path = {
    input (x) {
      return ['panelTrayStorage', x].join('.').replace(/[ -]/g, '_');
    }
  };

  set(x, value) {
    storage.set(this._path.input(x), value);
  }

  get(x) {
    return storage.get(this._path.input(x));
  }
}

let myStorage = new PanelTrayStorage();