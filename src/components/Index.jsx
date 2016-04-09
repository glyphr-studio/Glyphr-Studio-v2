import React from "react";
import {config} from "./../config/config";
import {Link} from "react-router";

export default React.createClass({
  render() {
    return (
      <div style={{padding: 30}}>
        <h2 style={{"font-size":24}}>Hi!</h2><br/>
        <span>We're currently working at: </span>
        <Link to={config.routes.project_editor_tab('chooser')}>Project/Editor/Chooser</Link>
      </div>
    )
  }
})