// import React
// import ReactRouter
import {config} from "./../config/config";

export default React.createClass({
  render() {
    return (
      <div style={{padding: 30}}>
        <h2 style={{"fontSize":24}}>Hi!</h2><br/>
        <span>We're currently working at: </span>
        <Link to={config.routes.project_editor_tab('leftframe')}>Project/Editor/FrameLeft</Link>
      </div>
    )
  }
})