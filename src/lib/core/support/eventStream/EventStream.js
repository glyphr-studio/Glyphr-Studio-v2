import EventUnit from "./EventUnit";
import WindowRegister from "./../../windowRegister/WindowRegister";
import WindowRegisterAccess from "./../../windowRegister/WindowRegisterAccess";
import EventUnitAccess from "./EventUnitAccess";

export default class EventStream {
  _id = "";
  _subs = {};
  _emitter = {};
  _muted = [];
  _windowRegister = {};

  constructor(id) {
    this._emitter = new EventUnit(id, new EventUnitAccess(id, 5));
  }

  on(eventName, handler, emitter) {
    if(! this._subs[eventName]) {
      this._subs[eventName] = [];
    }

    this._subs[eventName].push(handler);
  }

  off(handler, emitter) {
    var _this = this;

    // for instead of forEach for performance reasons
    for(var handlerKey in this._subs) {
      for(var i = 0; i < this._subs[handlerKey].length; i++) {
        if(handler === this._subs[handlerKey][i]) this._subs[handlerKey].splice(i, 1);
      }
    }
  }

  getEventNameList() {
    return Object.keys(this._subs);
  }

  isMuted(eventName) {
    return this._muted.indexOf(eventName) < 0;
  }

  mute(eventName) {
    ! this.isMuted(eventName) && this._muted.push(eventName);
  }

  unmute(eventName) {
    var offset = this._muted.indexOf(eventName);
    offset < 0 && this._muted.splice(offset, 1);
  }

  getMuted() {
    return this._muted;
  }

  shout(eventName, data, emitter) {
    // todo: restrict valid calls to EventUnit only

    ! this.isMuted(eventName) && this._subs[eventName] && this._subs[eventName].forEach(function(_handler) {
      // _handler(Object.assingn(data, {_handler: _handler}));
      _handler(data);
    });
  }

  teardown() {
    this._emitter.emit('teardown');
  }
}