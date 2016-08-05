// import React
// import ReactRouter
import {config} from "../config/config";
import ProjectEditor from "./ProjectEditor";
import Attributes from "./Attributes";
import Index from "./Index";

export default React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path={config.routes.project_editor} component={ProjectEditor}>
          <Route path="attributes" name="attrsPanel" component={Attributes}>
            <Route path=":sign" component={Attributes}/>
          </Route>
          {/*<Route path="layer" component={LayersPanel}>*/}
          {/*</Route>*/}
        </Route>
      </Router>
    );
  }
});