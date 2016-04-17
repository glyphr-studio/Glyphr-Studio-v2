// import React
// import ReactDOM
import Routing from "./components/Routing";
import "./style/default/General";
import "./lib/jqueryAddons/jqueryAddons";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routing/>, document.getElementById('app'));
});