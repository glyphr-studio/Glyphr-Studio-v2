import React from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import "./style/default/General";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routing/>, document.getElementById('app'));
});