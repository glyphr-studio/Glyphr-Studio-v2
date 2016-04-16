// import React
import Panel from "./../Panel";
import PanelButton from "./../PanelButton";
import PanelField from "./../PanelField";
import PanelSection from "./../PanelSection";
import locale from "./../../../../locale/Locale";

export default React.createClass({
  render() {
    return (
      <Panel name="Layers" title="Glyph Edit">
        <PanelSection title="">
          <p>{locale.get('layersPanel.noShapesExist')}</p>
        </PanelSection>
      </Panel>
    )
  }
})