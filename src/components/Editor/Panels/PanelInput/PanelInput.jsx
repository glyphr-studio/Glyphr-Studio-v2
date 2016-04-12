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
    var tlp = tooltip.info(this.refs.input, 'I am locked now, unlock me by again pressing on the lock.');

    if(inputIsDisabled) tlp.tooltipster('hide');

  },
  handleMaxLength() {
    var $input = $(this.refs.input),
        // this.props.maxLength -1 since we're listening on keypress
        maxLength = this.props.maxLength;

    // note: will allow only x > -999 for maxlength 4 etc.
    tooltip.get(this.refs.input).tooltipster('destroy');
    $input.val().length > maxLength &&
    tooltip.danger(this.refs.input, `Too long, sir! I only take up to ${maxLength} characters.`, 2600) &&
    $input.val($input.val().slice(0, maxLength));
  },
  getLock() {
    // disableLock property turns off locking the input
    if (!this.props.disableLock) return <i title="Lock" onClick={this.toggleInputAccess} ref="lock">{Icons.input.access}</i>;
  },
  render() {
    return (
      <div className="access-input group" ref="root">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="access-input input">
          {this.getLock()}
          <input onChange={this.handleMaxLength} type={this.props.type} step={this.props.step} id={this.props.id}
                 placeholder={this.props.placeholder} defaultValue={this.props.value}
                 disabled={this.props.disabled} ref="input"/>
        </div>
      </div>
    )
  }
})