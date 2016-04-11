import React from "react";
import Storage from "./../../../../lib/storage/Storage";
import "./../../../../style/default/Glyph";
import {config} from "./../../../../config/config";
import {NavLink} from "./../../../Navigation";
import {Glyph} from "./../../../../lib/glyph/Glyph";
import MyStorage from "./ChooserStorage";

export default React.createClass({
  registerWithStorage() {
    var glyph = new Glyph(this.props.character);
    MyStorage.set(glyph);
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