import React from "react";
import {Icons} from "./../../../Icons";
import "./../../../../style/default/PanelTextInput";
import $ from "jquery";
import {tooltip} from "./../../../../lib/tooltip/Tooltip";

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

    tooltip.get(this.refs.input).tooltipster('destroy');
    var tlp = tooltip.info(this.refs.input, 'The input is now locked, to unlock it click at the lock icon.');

    if(inputIsDisabled) tlp.tooltipster('hide');

  },
  handleMaxLength() {
    var $input = $(this.refs.input),
        // this.props.maxLength -1 since we're listening on keypress
        keypressMaxLength = this.props.maxLength - 1;

    tooltip.get(this.refs.input).tooltipster('destroy');
    $input.val().length > keypressMaxLength &&
    tooltip.danger(this.refs.input, `Data too long, max length is ${this.props.maxLength}!`, 2000) &&
    $input.val($input.val().slice(0, keypressMaxLength));
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
          <input onKeyPress={this.handleMaxLength} type={this.props.type} step={this.props.step} id={this.props.id}
                 placeholder={this.props.placeholder} defaultValue={this.props.value}
                 disabled={this.props.disabled} ref="input"/>
        </div>
      </div>
    )
  }
})