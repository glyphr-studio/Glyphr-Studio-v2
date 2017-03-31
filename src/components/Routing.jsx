import {config} from "../config/config";
import {storage} from "./../lib/storage/Storage";

import ProjectEditor from "./ProjectEditor";
import FrameLeft from "./Editor";
import Index from "./Index";
import CreateProject from "./CreateProject";

import PanelTrayView from "./PanelTrayView";
import PanelTrayActions from "./PanelTrayActions";
import PanelTrayHistory from "./PanelTrayHistory";
import PanelTrayAttributes from "./PanelTrayAttributes";
import PanelTrayShapes from "./PanelTrayShapes";

import PanelTray from "./PanelTray";

let routing = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={CreateProject}/>
      </Router>
    );
  }
});

let appRouting = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/projects" component={CreateProject}/>
        <Route path={config.routes.project_editor} component={ProjectEditor}>
          <Route path="leftframe" name="leftframe" component={FrameLeft}>
            <Route path="tray" component={PanelTray}>
              <Route path="attributes(/:flyout)" component={PanelTrayAttributes}/>
              <Route path="actions(/:flyout)" component={PanelTrayActions}/>
              <Route path="history(/:flyout)" component={PanelTrayHistory}/>
              <Route path="view(/:flyout)" component={PanelTrayView}/>
              <Route path="shapes(/:flyout)" component={PanelTrayShapes}/>
            </Route>
          </Route>
          {/*<Route path="layer" component={LayersPanel}>*/}
          {/*</Route>*/}
        </Route>
      </Router>
    );
  }
});

/**
 * Check whether a project has been intitialized:
 *  1. project has been not initialized: user is not able to access the app;
 *  2. project has bene initialized: user is able to access the app.
 */
export default (storage.getHead() === null ? routing : appRouting);