import "./../style/default/framework"
import Panel from "./Panel";
import PanelHeader from "./PanelHeader";
import PanelTray from "./PanelTray";
import GlyphTile from "./GlyphTile";


var fakedata = {
  selectedTray: 'attributes',
  selectedGlyph: '0x0041',
  selectedGlyphPathData: 'M238,400 C358,400,455,310,455,200 C455,90,358,0,238,0 C118,0,21,90,21,200 C21,310,118,400,238,400Z M93.52675123611323,252.36348271920912 C59.691222598,155.302507543,97.257521118,54.085290669,176.773805322,26.365854444 C256.290089525,-1.353581781,348.637720126,54.575542105,382.473248764,151.636517281 C416.308777402,248.697492457,378.742478882,349.914709331,299.226194678,377.634145556 C219.709910475,405.353581781,127.362279874,349.424457895,93.526751236,252.363482719Z M423,300 C423,300,543.000047712,400,543.000047712,400 C543.000047712,400,543.000047712,350,543.000047712,350 C543.000047712,350,455.000012723,300,455.000012723,200 C455.000012723,100,543.000047712,50,543.000047712,50 C543.000047712,50,543.000047712,0,543.000047712,0 C543.000047712,0,423,100,423,100 C423,100,423,300,423,300Z'
};

export default React.createClass({

  render() {
    var basicLatinOrder = ['0x0041','0x0042','0x0043','0x0044','0x0045','0x0046','0x0047','0x0048','0x0049','0x004A','0x004B','0x004C','0x004D','0x004E','0x004F','0x0050','0x0051','0x0052','0x0053','0x0054','0x0055','0x0056','0x0057','0x0058','0x0059','0x005A','0x0061','0x0062','0x0063','0x0064','0x0065','0x0066','0x0067','0x0068','0x0069','0x006A','0x006B','0x006C','0x006D','0x006E','0x006F','0x0070','0x0071','0x0072','0x0073','0x0074','0x0075','0x0076','0x0077','0x0078','0x0079','0x007A','0x0030','0x0031','0x0032','0x0033','0x0034','0x0035','0x0036','0x0037','0x0038','0x0039','0x0021','0x0022','0x0023','0x0024','0x0025','0x0026','0x0027','0x0028','0x0029','0x002A','0x002B','0x002C','0x002D','0x002E','0x002F','0x003A','0x003B','0x003C','0x003D','0x003E','0x003F','0x0040','0x005B','0x005C','0x005D','0x005E','0x005F','0x0060','0x007B','0x007C','0x007D','0x007E','0x0020'];

    // Eventually have a switch here based on selected glyph range to show in the flyout
    // For now just defaulting to Basic Latin
    var glyphTileNodes = basicLatinOrder;

    glyphTileNodes = glyphTileNodes.map(function(v) {
      return(
        <GlyphTile data={fakedata} codepoint={v}></GlyphTile>
      );
    });
    
    console.log(glyphTileNodes);
    
    return (
      <div className="leftframe">
        <Panel className="panel">
         <PanelHeader title="Glyph Edit" className="panel-header-primary" flyoutType="pages">
           <button>Settings</button>
           <button>Help</button>
         </PanelHeader>
        </Panel>

        <Panel className="panel">
          <PanelHeader title="Latin Capital A" className="panel-header-secondary" flyoutType="glyphs">
            {glyphTileNodes}
          </PanelHeader>
        </Panel>

        <Panel className="panel-showtray">
         <PanelHeader title="Attributes" className="panel-header-tertiary" flyoutType="tools">
            <button>Attributes</button>
            <button>Actions</button>
            <button>Shapes</button>
            <button>History</button>
            <button>View</button>
          </PanelHeader>

          <PanelTray data={fakedata}>
          </PanelTray>
        </Panel>

      </div>
    );
  }
});