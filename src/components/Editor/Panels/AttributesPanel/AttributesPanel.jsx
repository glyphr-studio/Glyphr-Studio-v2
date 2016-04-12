import React from "react";
import Panel from "./../Panel";
import PanelSection from "./../PanelSection";
import PanelField from "./../PanelField";
import PanelInput from "../PanelInput/PanelInput";
import {Icons} from "./../../../Icons";
import PanelButton from "./../PanelButton";
import ChooserStorage from "./../GlyphsPanel/ChooserStorage";
import Glyph from "./../../../../lib/glyph/Glyph";
import {config} from "./../../../../config/config";
import {Navigation} from "react-router";
import locale from "./../../../../locale/Locale";

// todo: in respect to the previous version buttons are added on demand
// once the feature they represent is available (e.g.: under the available selection).

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  mixins:       [Navigation],
  getInitialState() {
    return Object.assign({},
      this.getChooserGlyph() && this.getChooserGlyph().getSkeleton() || {},
      {icons: Icons.attributesPanel},
      {
        fields: [
          {
            title: 'glyph width',
            label: 'auto calculate'
          },
          {
            title: 'left side bearing',
            label: 'use default'
          },
          {
            title: 'right side bearing',
            label: 'use default'
          }
        ]
      });
  },
  playDemos() {
    // Creating an on demand field
    // note: example depicts a non-persistent field
    // for persistent fields we need to utilize Storage
    setTimeout(() => {
      if (!this.isMounted()) return;

      var fieldSet = this.state.fields;
      fieldSet.push({
        title: 'on demand field',
        label: 'use default'
      });

      this.setState({fields: fieldSet});

      console.log(this.state.fields);
    }, 3000);
  },
  componentDidMount() {
    this.playDemos();
  },
  componentWillMount() {
    if (typeof this.state.char === "undefined") this.handleNoSelectedGlyphCase();
    else this.handleSelectedGlyphCase();
  },
  getChooserGlyph() {
    return ChooserStorage.getLatestGlyph();
  },
  handleNoSelectedGlyphCase() {
    // Redirect to the chooser
    // todo: some kind of notification is needed to inform user that a glyph must be selected first
    return this.context.router.push(config.routes.project_editor_tab('chooser'));
  },
  handleSelectedGlyphCase() {
    return this.context.router.push(config.routes.project_editor_tab('attribute') + '/' + this.getChooserGlyph().char());
  },
  getIcons() {
    var _this = this;
    return Object.keys(this.state.icons).map((namespace, i) => {
      return (
        <PanelField key={i} title={namespace}>

          {Object.keys(_this.state.icons[namespace]).map((key, value) => {
            return (
              <PanelButton title={[locale.get(`icon.${key}`), locale.get(`shapeAction.${key}`)].join("\n")} key={value}>
                {_this.state.icons[namespace][key]}
              </PanelButton>)

          })}
        </PanelField>)
    });
  },
  getInputFields() {
    return this.state.fields.map((field, i) => {
      return (<PanelField title={field.title} key={i}>
        <PanelInput id={field.title} label={field.label} type="number" step="1" maxLength="4"/>
      </PanelField>);
    });
  },
  render() {
    return (
      <Panel name="attributes" title={'glyph edit >> ' + this.state.charName}>
        <PanelSection title="">
          {this.getInputFields()}
        </PanelSection>

        <PanelSection title="Action">
          {this.getIcons()}
        </PanelSection>
      </Panel>
    )
  }
})