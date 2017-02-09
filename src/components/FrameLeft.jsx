import "./../style/default/framework"
import "./../style/default/PanelHeader"
import Panel from "./Panel";
import PanelHeader from "./PanelHeader";
import PanelTray from "./PanelTray";
import PanelHeaderFlyoutGlyphSelect from "./PanelHeaderFlyoutGlyphSelect";
import PanelHeaderListSelect from "./PanelHeaderFlyoutListSelect";
import EditCanvas from "./../plugins/EditCanvas/EditCanvas";
import routes from "./../config/routes";

import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";
let flee = new PluginEventUnit("frameLeft", 3);

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      selectedTray: "attributes"
    }
  },
  render() {
    return (
      <div style={{display: "flex"}}>
        <div className="leftframe">
          <Panel className="panel">
            <PanelHeaderListSelect title="Glyph Edit" id="pages" className="panel-header-primary" flyoutType="pages">
              <button>Settings</button>
              <button>Help</button>
            </PanelHeaderListSelect>
          </Panel>

          <Panel className="panel">
            <PanelHeaderFlyoutGlyphSelect id="glyphs" title="Glyphs" className="panel-header-secondary"/>
          </Panel>

          <Panel className="panel-showtray">
            <PanelHeaderListSelect title="Attributes" id="tools" className="panel-header-tertiary" flyoutType="tools">
              <button onClick={this.context.router.push.bind(this, routes.attributes)}>Attributes</button>
              <button onClick={this.context.router.push.bind(this, routes.actions)}>Actions</button>
              <button onClick={this.context.router.push.bind(this, routes.shapes)}>Shapes</button>
              <button onClick={this.context.router.push.bind(this, routes.history)}>History</button>
              <button onClick={this.context.router.push.bind(this, routes.view)}>View</button>
            </PanelHeaderListSelect>

            <PanelTray>
              {this.props.children}
            </PanelTray>
          </Panel>
        </div>

        <EditCanvas/>
      </div>
    );
  }
});