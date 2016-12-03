// import React
import {Icons} from "./Icons";
import "./../style/default/PanelTextInput";
// import $
import {Tooltip} from "./../lib/tooltip/Tooltip";
import MyStorage from "./PanelInputStorage";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";


// Panel Input Event Emitter
let piee = new PluginEventUnit('panelInput', 3);

export default React.createClass({
  propTypes:{
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.number,
    step: React.PropTypes.number,
    disableLock: React.PropTypes.bool,
    disableCheck: React.PropTypes.bool,
    disableInput: React.PropTypes.bool,
    storagePath: React.PropTypes.string,
    isDefaultChecked: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      id:          "",
      label:       "",
      type:        "",
      placeholder: "",
      value:       10,
      step:        1,
      disableLock: false,
      disableCheck: false,
      disableInput: false,
      storagePath: "",
      isDefaultChecked: false
    }
  },
  getInitialState() {
    return {
      lock: ! this.props.disableLock && ! this.props.disableInput && this.getLockIcon(),
      check: ! this.props.disableCheck && this.getCheckIcon(),
      input: ! this.disableInput && this.getInput()
    }
  },
  componentDidMount() {
    let gesDemoHandler = function(data) {
      console.log('looks like I mounted', data.component.props.id);
    };
    piee.emit('componentDidMount', {component: this});
    // Initialize jQuery refs
    this.$ = {};
    for(let ref in this.refs) {
      this.$[ref] = $(this.refs[ref]) || {};
    }

    // sync lock icon with the input state on mount
    this.syncStyleWithInputState();
    if(this.getInputData().isFocused) this.$.input.focus();
  },
  syncStyleWithInputState() {
    let input = this.getInputData(),
        $input = this.$.input,
        $check = this.$.check,
        $lock = this.$.lock,
        $lockAndInput = $($input).add($lock);

    // Sync lock state with input state
    $input.isActive() && $lock.activate() || $lock.disable();

    // Show lock and input when the checkbox is enabled
    // note: don't focus the input for the user, interrupts focus
    // when a dynamic input has been added
    $check.isActive() && $lockAndInput.show() || $lockAndInput.hide();
  },
  handleLockClickEvent() {
    let $input = $(this.refs.input),
        $lock = $(this.refs.lock),
        tooltip = Tooltip(this.refs.input);
    tooltip.destroy();
    tooltip.info(`I am locked now, unlock me by again pressing on the lock.`, 1350);
    this.syncStyleWithInputState();
    $input.add($lock).toggleState();
    this.saveInputData();
    if($lock.isActive()) tooltip.destroy();
  },
  handleCheckClickEvent() {
    let $check = $(this.refs.check);
    Tooltip(this.refs.input).destroy();
    $check.switchClass();
    this.syncStyleWithInputState();
    this.saveInputData();
  },
  handleChangeEvent() {
    this.handleInputMaxLength();
    this.saveInputData();
  },
  handleInputMaxLength() {
    let $input = $(this.refs.input),
        maxLength = this.props.maxLength,
        tooltip = Tooltip(this.refs.input);

    // note: will allow only x > -999 for maxlength 4 etc.
    tooltip.destroy();
    $input.val().length > maxLength &&
    tooltip.danger(`Too long, sir! I only take up to ${maxLength} characters.`, 2600) &&
    $input.val($input.val().slice(0, maxLength));
  },
  handleLabelClickEvent() {
    $check = $(this.refs.check);
    // forward the click to the check
    $check.found() && $check.click();
  },
  handleInputFocusEvent() {

    MyStorage.setInput(this.props.storagePath, this.props.id,
      Object.assign({}, this.getInputData(), {isFocused: true}));
  },
  handleInputBlurEvent() {

    MyStorage.setInput(this.props.storagePath, this.props.id,
      Object.assign({}, this.getInputData(), {isFocused: false}));
  },
  getLockIcon() {
    // disableLock property turns off locking the input
    return <i title="Lock" onClick={this.handleLockClickEvent} ref="lock">{Icons.input.access}</i>;
  },
  getCheckIcon() {
    // disableLock property turns off locking the input
    return (<i title="Check" className={this.getInputData().checkClass || ! this.props.isDefaultChecked && "disabled"}
         onClick={this.handleCheckClickEvent} ref="check">{Icons.input.check}</i>)
  },
  saveInputData() {
    let $ = this.$;
    MyStorage.setInput(this.props.storagePath, this.props.id, Object.assign({}, this.getInputData(), {
      value: $.input.val(),
      disabled: $.input.isDisabled(),
      checkClass: $.check.getClass()
    }));
  },
  getInputData() {
    return MyStorage.getInput(this.props.storagePath, this.props.id) || {};
  },
  getInput() {
    return (
      <input onChange={this.handleChangeEvent} type={this.props.type} step={this.props.step} id={this.props.id}
             placeholder={this.props.placeholder} defaultValue={this.getInputData().value || this.props.value}
             onFocus={this.handleInputFocusEvent} onBlur={this.handleInputBlurEvent}
             disabled={this.getInputData().disabled || this.props.disabled} ref="input"/>
    )
  },
  render() {
    return (
      <div className="access-input group" ref="root">
        <label htmlFor={this.props.id} ref="label" onClick={this.handleLabelClickEvent}>{this.props.label}</label>
        <div className="access-input input">
          {this.state.lock}
          {this.state.input}
          {this.state.check}
        </div>
      </div>
    )
  }
})