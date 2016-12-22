import React from "react";
import ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import "script!./../bower_components/jquery/dist/jquery";
import "script!./../bower_components/tooltipster/js/jquery.tooltipster";
import "script!./../bower_components/paper/dist/paper-full.js";

window.React = React;
window.ReactDOM = ReactDOM;
paper.install(window);

console.log("loading in");

window.ReactRouter = ReactRouter;
// unload router to the global scope
for(let i in ReactRouter) {
  window[i] = ReactRouter[i];
}
