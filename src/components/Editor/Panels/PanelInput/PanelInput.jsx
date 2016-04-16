// import React
import {Icons} from "./../../../Icons";
import "./../../../../style/default/PanelTextInput";
// import $
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
      disableLock: false,
      disableCheck: false,
      storagePath: '',
      isDefaultChecked: false
    }
  },
  getInitialState() {
    return {
      lock: ! this.props.disableLock && this.getLockIcon(),
      check: ! this.props.disableCheck && this.getCheckIcon()
    }
  },
  componentDidMount() {
    // sync lock icon with the input state on mount
    this.syncStyleWithInputState();
  },
  syncStyleWithInputState() {
    var input = this.getInputData();
    // Sync lock state with input state
    this.refs.input && this.refs.input.hasAttribute('disabled') &&
      $([this.refs.lock || {}, this.refs.input || {}]).removeClass('disabled').addClass('disabled') ||
      $([this.refs.lock || {}, this.refs.input || {}]).removeClass('disabled');

    // Show lock and input when the checkbox is enabled
    ! $(this.refs.check).hasClass('disabled') &&
      $(this.refs.check).removeClass('disabled').addClass('active') &&
      $([this.refs.lock || {}, this.refs.input || {}]).show() &&
      $(this.refs.input || {}).focus();

    // Hide lock and input when the checkbox is disabled
    $(this.refs.check).hasClass('disabled') &&
      $(this.refs.check).removeClass('active').addClass('disabled') &&
      $([this.refs.lock || {}, this.refs.input || {}]).hide();
  },
  handleLockClickEvent() {
    this.toggleInputAccess();
    this.saveInputData();
  },
  handleCheckClickEvent() {
    tooltip.get(this.refs.input).tooltipster('destroy');
    $(this.refs.check).toggleClass('disabled');
    this.syncStyleWithInputState();
    this.saveInputData();
  },
  toggleInputAccess() {
    var $input = $(this.refs.input),
        inputIsDisabled = $input.attr('disabled');
    $input.attr('disabled', ! inputIsDisabled);

    this.syncStyleWithInputState();

    tooltip.get(this.refs.input).tooltipster('destroy');
    var tlp = tooltip.info(this.refs.input,
      `I am locked now, unlock me by again pressing on the lock.`);

    if(inputIsDisabled) tlp.tooltipster('hide');

  },
  handleChangeEvent() {
    this.handleInputMaxLength();
    this.saveInputData();
  },
  handleInputMaxLength() {
    var $input = $(this.refs.input),
        maxLength = this.props.maxLength;

    // note: will allow only x > -999 for maxlength 4 etc.
    tooltip.get(this.refs.input).tooltipster('destroy');
    $input.val().length > maxLength &&
    tooltip.danger(this.refs.input, `Too long, sir! I only take up to ${maxLength} characters.`, 2600) &&
    $input.val($input.val().slice(0, maxLength));
  },
  handleLabelClickEvent() {
    // forward the click to the check
    this.refs.check && $(this.refs.check).click();
  },
  getLockIcon() {
    // disableLock property turns off locking the input
    return <i title="Lock" onClick={this.handleLockClickEvent} ref="lock">{Icons.input.access}</i>;
  },
  getCheckIcon() {
    // disableLock property turns off locking the input
    return (<i title="Check" className={this.getInputData().checkClass || (! this.props.isDefaultChecked && "disabled")}
         onClick={this.handleCheckClickEvent} ref="check">{Icons.input.check}</i>)
  },
  saveInputData() {
    var refs = this.refs;
    MyStorage.setInput(this.props.storagePath, this.props.id, {
      value: refs.input && refs.input.value,
      disabled: refs.input && refs.input.hasAttribute('disabled'),
      checkClass: refs.check && refs.check.getAttribute('class')
    });
  },
  getInputData() {
    return MyStorage.getInput(this.props.storagePath, this.props.id) || {};
  },
  render() {
    return (
      <div className="access-input group" ref="root">
        <label htmlFor={this.props.id} ref="label" onClick={this.handleLabelClickEvent}>{this.props.label}</label>
        <div className="access-input input">
          {this.state.lock}
          <input onChange={this.handleChangeEvent} type={this.props.type} step={this.props.step} id={this.props.id}
                 placeholder={this.props.placeholder} defaultValue={this.getInputData().value || this.props.value}
                 disabled={this.getInputData().disabled || this.props.disabled} ref="input"/>
          {this.state.check}
        </div>
      </div>
    )
  }
})