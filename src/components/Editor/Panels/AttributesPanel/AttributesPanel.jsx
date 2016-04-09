import React from "react";
import Panel from "./../Panel";
import PanelSection from "./../PanelSection";
import {Icons} from "./../../../Icons";
import PanelButton from "./../PanelButton";
import Storage from "./../../../../lib/storage/Storage";
import {config} from "./../../../../config/config";
import {Navigation} from "react-router";

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  mixins:       [Navigation],
  getInitialState() {
    var state = Object.assign({}, this.getGlyph(), {icons: Icons.attributesPanel});
    return  state;
  },
  componentWillMount() {
    if (!this.state.character) this.handleNoSelectedGlyphCase();
    else this.handleSelectedGlyphCase();
  },
  getGlyph() {
    var clickedGlyph = this.getChooserClickedGlyph();
    clickedGlyph && this.setLastGlyph(clickedGlyph);
    return clickedGlyph || this.getLastGlyph();
  },
  getChooserClickedGlyph() {
    return Storage.get('glyph.clicked');
  },
  getLastGlyph() {
    return Storage.get('attributesPanel.lastGlyph');
  },
  setLastGlyph(value) {
    Storage.native().set('attributesPanel.lastGlyph', value);
  },
  handleNoSelectedGlyphCase() {
    // Redirect to the chooser
    // todo: some kind of notification is needed to inform user that a glyph must be selected first
    return this.context.router.push(config.routes.project_editor_tab('chooser'));
  },
  handleSelectedGlyphCase() {
    return this.context.router.push(config.routes.project_editor_tab('attribute') + '/' + this.getGlyph().character);
  },
  getAttributesPanelIcons() {
    var _this = this;
    return Object.keys(this.state.icons).map(function (key, value) {
        return <PanelSection key={key}>
          <PanelButton title={key}>
            {_this.state.icons[key]}
          </PanelButton>
        </PanelSection>
      })

  },
  render() {
    return (
      <Panel name="attributes" title={'glyph edit >> ' + this.state.characterName}>
        <div className="panel_section">
          <table className="detail">
            <tbody>
            <tr>
              <td colSpan={2} className="detailtitle"><h3> glyph width </h3></td>
            </tr>
            <tr>
              <td> auto calculate <span className="unit">(em units)</span></td>
              <td>
                <input type="checkbox" defaultChecked id="isautowide"/>
                <input type="number" disabled="disabled" defaultValue={0}/></td>
            </tr>
            <tr>
              <td colSpan={2} className="detailtitle"><h3> left side bearing </h3></td>
            </tr>
            <tr>
              <td> use default <span className="unit">(em units)</span></td>
              <td>
                <input type="checkbox" defaultChecked id="leftsidebearing"/>
                <input type="number" disabled="disabled" defaultValue={20}/></td>
            </tr>
            <tr>
              <td colSpan={2} className="detailtitle"><h3> right side bearing </h3></td>
            </tr>
            <tr>
              <td> use default <span className="unit">(em units)</span></td>
              <td>
                <input type="checkbox" defaultChecked id="rightsidebearing"/>
                <input type="number" disabled="disabled" defaultValue={20}/></td>
            </tr>
            </tbody>
          </table>
          <PanelSection title="test">
            {this.getAttributesPanelIcons()}
          </PanelSection>
        </div>
      </Panel>
    )
  }
})