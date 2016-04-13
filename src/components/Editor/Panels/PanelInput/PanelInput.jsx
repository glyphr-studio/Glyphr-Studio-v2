import React from "react";
import {Icons} from "./../../../Icons";
import "./../../../../style/default/PanelTextInput";
import $ from "jquery";
import {tooltip} from "./../../../../lib/tooltip/Tooltip";
import MyStorage from "./PanelInputStorage";

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
  getInitialState() {
    return {
      lock: this.getLockIcon(),
      check: this.getCheckIcon()
    }
  },
  componentDidMount() {
    // sync lock icon with the input state on mount
    this.toggleStyle();
  },
  toggleStyle() {
    var input = this.getInput();
    this.refs.input.hasAttribute('disabled') &&
      $([this.refs.lock, this.refs.input]).removeClass('disabled').addClass('disabled') ||
      $([this.refs.lock, this.refs.input]).removeClass('disabled');

      ! $(this.refs.check).hasClass('disabled') &&
      $(this.refs.check).removeClass('disabled').addClass('active') &&
      $([this.refs.lock || {}, this.refs.input]).show();

    $(this.refs.check).hasClass('disabled') &&
      $(this.refs.check).removeClass('active').addClass('disabled') &&
      $([this.refs.lock || {}, this.refs.input]).hide();
  },
  handleLockClickEvent() {
    this.toggleInputAccess();
    this.perserveInputValue();
  },
  handleCheckClickEvent() {
    $(this.refs.check).toggleClass('disabled');
    this.toggleStyle();
    this.perserveInputValue();
  },
  toggleInputAccess() {
    var $input = $(this.refs.input),
        inputIsDisabled = $input.attr('disabled');
    $input.attr('disabled', ! inputIsDisabled);

    this.toggleStyle();

    tooltip.get(this.refs.input).tooltipster('destroy');
    var tlp = tooltip.info(this.refs.input,
      `I am locked now, unlock me by again pressing on the lock.`);

    if(inputIsDisabled) tlp.tooltipster('hide');

  },
  handleChangeEvent() {
    this.handleMaxLength();
    this.perserveInputValue();
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
  getLockIcon() {
    // disableLock property turns off locking the input
    if (! this.props.disableLock) return <i title="Lock" onClick={this.handleLockClickEvent} ref="lock">{Icons.input.access}</i>;
  },
  getCheckIcon() {
    // disableLock property turns off locking the input
    if (! this.props.disableCheck) return (
      <i title="Check" className={this.getInput().checkClass || (! this.props.isDefaultChecked && "disabled")}
         onClick={this.handleCheckClickEvent} ref="check">{Icons.input.check}</i>
    );
  },
  perserveInputValue() {
    var refs = this.refs;
    MyStorage.setInput(this.props.locationPathname, this.props.id, {
      value: refs.input.value,
      disabled: refs.input.hasAttribute('disabled'),
      checkClass: refs.check && refs.check.getAttribute('class')
    });
  },
  getInput() {
    return MyStorage.getInput(this.props.locationPathname, this.props.id) || {};
  },
  render() {
    return (
      <div className="access-input group" ref="root">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="access-input input">
          {this.state.lock}
          <input onChange={this.handleChangeEvent} type={this.props.type} step={this.props.step} id={this.props.id}
                 placeholder={this.props.placeholder} defaultValue={this.getInput().value || this.props.value}
                 disabled={this.getInput().disabled || this.props.disabled} ref="input"/>
          {this.state.check}
        </div>
      </div>
    )
  }
})