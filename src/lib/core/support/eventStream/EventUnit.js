import SecurityError from "./../exceptions/SecurityError";
import WindowRegister from "../../windowRegister/WindowRegister";
import WindowRegisterAccess from "../../windowRegister/WindowRegisterAccess";

export default class EventUnit {
  _rootName = '';
  _isMuted = false;
  _accessLevel = {};
  _windowRegister = {};
  _streamName = {}; // specified by the extending class
  _stream = {}; // specified by the extending class
  _subs = [];

  constructor(eventRootName, AccessLevel) {
    this._rootName = eventRootName;

    if(typeof eventRootName !== "string") throw new TypeError(`${this._rootName} EventUnit: expected string, ${typeof eventRootName} was given`);
    if(eventRootName.length < 1) throw new TypeError(`${this._rootName} EventUnit: event root name must not be empty`);
    if(! AccessLevel) throw new SecurityError(`${this._rootName} EventUnit must request access level with an EventUnitAccess instance`);

    this._accessLevel = AccessLevel;
    this._accessLevel._id = this._rootName;
    this._windowRegister = new WindowRegister(new WindowRegisterAccess(this._rootName, 2));
    console.info(`EventEmitter: ${eventRootName} (init)`);
  }

  _getStackTrace() {
    let err = new Error();
    return err.stack;
  }

  _getStream() {
    return this._stream;
  }

  getAccessLevel() {
    return this.read(() => {
      return this._accessLevel;
    });
  }

  isMuted() {
    return this._accessLevel.read(() => {
      return this._getStream().isMuted(this.getName());
    });

  }

  mute() {
    this._accessLevel.mute(() => {
      for(let i = 0; i < this._emitedEventNames; i++) {
        this._getStream().mute(this._emitedEventNames[i]);
      }
    });

  }

  unmute() {
    this._accessLevel.mute(() => {
      for(let i = 0; i < this._emitedEventNames; i++) {
        this._getStream().unmute(this._emitedEventNames[i]);
      }
    });
  }

  muteForeign(foreign) {
    this._accessLevel.muteForeign(() => {
      this._getStream().mute(foreign);
    })
  }

  unmuteForeign(foreign) {
    this._accessLevel.muteForeign(() => {
      this._getStream().unmute(foreign);
    })
  }

  emit(eventName, data) {
    this._accessLevel.emit(() => {
      let properEventName = [this._rootName, eventName].join('.');
      let muted = this.isMuted() ? ' (muted)' : '';
      console.info(`${this._streamName}/${this._rootName}: ${properEventName.replace('.', '::')} ${muted}`);
      this._getStream().shout(properEventName, data, this);
    });
  }

  cascadeEmit(eventName, data) {
    this._accessLevel.emit(() => {
      let properEventName = [this._rootName, eventName].join('.');
      // ges is bound to window in main.jsx
      for(let i = 0; i <= properEventName.split('.').length; i++) {
        this._getStream().shout(properEventName, data, this);
        let muted = this.isMuted() ? ' (muted)' : '';
        console.info(`EventEmitter: ${properEventName.replace('.', '::')} ${muted}`);
        properEventName = properEventName.split('.');
        properEventName.pop();
        properEventName = properEventName.join('.');
      }
    });
  }

  on(eventName, handler) {
    this._accessLevel.subscribe(() => {
      this._subs.push(handler);
      this._getStream().on(eventName, handler, this);
    });
  }

  off(handler) {
    this._accessLevel.subscribe(() => {
      this._getStream().off(handler, this);
    });
  }

  destroy() {
    this._subs.forEach((handler, i) => {
      this.emit("destroy");
      this.off(handler);
      this._subs.splice(i, 1);
    });
  }

  getName() {
    return this._accessLevel.read(() => {
      return this._rootName;
    });
  }
}