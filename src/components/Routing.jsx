// import React
// import ReactRouter
import {config} from "../config/config";
import ProjectEditor from "./ProjectEditor";
import FrameLeft from "./FrameLeft";
import Index from "./Index";

import PanelTrayView from "./PanelTrayView";
import PanelTrayActions from "./PanelTrayActions";
import PanelTrayHistory from "./PanelTrayHistory";
import PanelTrayAttributes from "./PanelTrayAttributes";
import PanelTrayShapes from "./PanelTrayShapes";

import PanelTray from "./PanelTray";

export default React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path={config.routes.project_editor} component={ProjectEditor}>
          <Route path="leftframe" name="leftframe" component={FrameLeft}>
            <Route path="tray" component={PanelTray}>
              <Route path="attributes" component={PanelTrayAttributes}/>
              <Route path="actions" component={PanelTrayActions}/>
              <Route path="history" component={PanelTrayHistory}/>
              <Route path="view" component={PanelTrayView}/>
              <Route path="shapes" component={PanelTrayShapes}/>
            </Route>
          </Route>
          {/*<Route path="layer" component={LayersPanel}>*/}
          {/*</Route>*/}
        </Route>
      </Router>
    );
  }
});