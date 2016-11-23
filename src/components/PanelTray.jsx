import "./../style/default/Panel";
import PanelTrayAttributes from "./PanelTrayAttributes";


export default React.createClass({
  getTray() {
    switch(this.props.data.selectedTray) {
      case "attributes":
        return(
          <PanelTrayAttributes data={this.props.data}>
            {this.props.children}
          </PanelTrayAttributes>
        );
      case "actions":
        return(
          <PanelTrayActions data={this.props.data}>
            {this.props.children}
          </PanelTrayActions>
        );
      case "shapes":
        return(
          <PanelTrayShapes data={this.props.data}>
            {this.props.children}
          </PanelTrayShapes>
        );
      case "history":
        return(
          <PanelTrayHistory data={this.props.data}>
            {this.props.children}
          </PanelTrayHistory>
        );
      case "view":
        return(
          <PanelTrayView data={this.props.data}>
            {this.props.children}
          </PanelTrayView>
        );
    };
  },
  render() {
    return (
      <div className="panel-tray">
        <div className="content">
          {this.getTray()}
        </div>
      </div>
    )
  }
})