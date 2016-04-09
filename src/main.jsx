import React from "react";
import ReactDOM from "react-dom";
import Routing from "./components/Routing";
import store from "store2";
import "./style/default/General";
import Storage from "./lib/storage/Storage";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routing/>, document.getElementById('app'));
});

  
