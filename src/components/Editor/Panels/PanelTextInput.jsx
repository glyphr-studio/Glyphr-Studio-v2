import React from "react";
import {Icons} from "./../../Icons";
import "./../../../style/default/PanelTextInput";
import $ from "jquery";

export default React.createClass({
  getDefaultProps() {
    return {
      id:          "",
      label:       "",
      type:        "",
      placeholder: "",
      value:       "10",
      step:        "1",
      // for demonstration purposes
    }
  },
  componentDidMount() {
    // sync lock icon with the input state on mount
    if (typeof this.props.disabled !== "undefined") this.toggleStyle();
  },
  toggleStyle() {
    $([this.refs.lock, this.refs.input]).toggleClass('disabled');
  },
  toggleInputAccess() {
    this.toggleStyle();
    var $input = $(this.refs.input),
        inputIsDisabled = $input.attr('disabled');
    $input.attr('disabled', ! inputIsDisabled);
  },
  getLock() {
    // disableLock property turns off locking the input
    if (!this.props.disableLock) return <i onClick={this.toggleInputAccess} ref="lock">{Icons.input.access}</i>;
  },
  render() {
    return (
      <div className="access-input group" ref="root">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="access-input input">
          {this.getLock()}
          <input type={this.props.type} step={this.props.step} id={this.props.id}
                 placeholder={this.props.placeholder} defaultValue={this.props.value}
                 disabled={this.props.disabled} ref="input"/>
        </div>
      </div>
    )
  }
})