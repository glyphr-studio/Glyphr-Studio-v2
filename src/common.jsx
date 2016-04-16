import React from "react";
import ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import "script!./../bower_components/jquery/dist/jquery";
import "script!./../bower_components/tooltipster/js/jquery.tooltipster";

window.React = React;
window.ReactDOM = ReactDOM;

window.ReactRouter = ReactRouter;
// unload router to the global scope
for(var i in ReactRouter) {
  window[i] = ReactRouter[i];
}
