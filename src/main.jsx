// import React
// import ReactDOM
import "./style/default/Reset";
import "./style/default/General";
import Routing from "./components/Routing";
import "./lib/jqueryAddons/jqueryAddons";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routing/>, document.getElementById('app'));
});