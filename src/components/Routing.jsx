import React from "react";
import {Router, Route, hashHistory, IndexRoute, Redirect} from "react-router";
import {config} from "../config/config";
import ProjectEditor from "./Editor/ProjectEditor";
import GlyphsPanel from "./Editor/Panels/GlyphsPanel/GlyphsChoicePanel";
import AttributesPanel from "./Editor/Panels/AttributesPanel/AttributesPanel";
import Panel from "./Editor/Panels/Panel";
import Index from "./Index";

export default React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path={config.routes.project_editor} component={ProjectEditor}>
          <Route path="chooser" component={GlyphsPanel}/>
          <Route path="attribute" component={AttributesPanel}>
            <Route path=":sign" component={AttributesPanel}/>
          </Route>
          <Route path="layer" component={Panel}/>
        </Route>
      </Router>
    );
  }
});