// import React
// import ReactRouter
import {config} from "../config/config";
import ProjectEditor from "./ProjectEditor";
import FrameLeft from "./FrameLeft";
import Index from "./Index";

export default React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path={config.routes.project_editor} component={ProjectEditor}>
          <Route path="leftframe" name="leftframe" component={FrameLeft}>
            <Route path=":sign" component={FrameLeft}/>
          </Route>
          {/*<Route path="layer" component={LayersPanel}>*/}
          {/*</Route>*/}
        </Route>
      </Router>
    );
  }
});