import React from "react";
import Storage from "./../../../../lib/storage/Storage";
import "./../../../../style/default/Glyph";
import {config} from "./../../../../config/config";
import {NavLink} from "./../../../Navigation";


export default React.createClass({
  registerWithStorage() {
    Storage.once('glyph.clicked', {
      characterName: this.props.characterName,
      character: this.props.character,
    })
  },
  render() {
    return (
      <NavLink onClick={this.registerWithStorage} to={config.routes.project_editor_tab('attribute') + '/' + this.props.character}>
        <div className="glyphselect" title={this.props.characterName}>
          <div className="glyphselectbutton">{this.props.character}</div>
          <div className="glyphselectname">{this.props.character}</div>
        </div>
      </NavLink>
    )
  }
})