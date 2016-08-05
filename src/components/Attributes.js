import MainSidebar from "./MainSidebar.js";
import Panel from "./Panel.js";
import PanelHeader from "./PanelHeader";

export default React.createClass({
  render() {
    return (
      <MainSidebar>
       <Panel>
         <PanelHeader title="Glyph Edit" className="panel-header-primary">
           <button>Settings</button>
           <button>Help</button>
         </PanelHeader>
       </Panel>

        <Panel>
          <PanelHeader title="Latin Capital G" className="panel-header-secondary" flyoutType="glyph"/>
        </Panel>

        <div className="panel-showtray">
          <PanelHeader title="Attributes" className="panel-header-tertiary">
            <button>Attributes</button>
            <button>Shapes</button>
            <button>History</button>
            <button>View</button>
          </PanelHeader>

          <div className="panel-tray">
            <div className="content">
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content  content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content<br /><br />
              content content content content content content content content content
            </div>
          </div>
        </div>
      </MainSidebar>
    );
  }
})