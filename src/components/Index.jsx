// import React
// import ReactRouter
import {config} from "./../config/config";

export default React.createClass({
  render() {
    return (
      <div style={{padding: 30}}>
        <h2 style={{"font-size":24}}>Hi!</h2><br/>
        <span>We're currently working at: </span>
        <Link to={config.routes.project_editor_tab('attributes')}>Project/Editor/Attributes</Link>
      </div>
    )
  }
})