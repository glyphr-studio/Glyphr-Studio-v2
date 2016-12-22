import store from "store2";
import PluginEventUnit from "./../core/pluginEventStream/PluginEventUnit";

export default class Storage {
  _toDestroy = [];
  _subs = {};
  _store = store;
  _eventUnit = new PluginEventUnit('StoragePlugin', 4);

  once(key, value) {
    this._store.set(key, value);
    this._toDestroy.push(key);
  }

  get(key) {
    let value = this._store.get(key);
    if(this._toDestroy.includes(key)) this._store.remove(key);
    this._eventUnit.emit(`get`, {key: key, _: this});
    return value;
  }


  subscribe(key, handler, context, data) {
    if(! this._subs[key]) this._subs[key] = [];
    handler = handler.bind(context || this, data);
    this._subs[key].push(handler);

    return handler;
  }

  unsubscribe(identifier) {
    if(typeof identifier === "function") {
      // remove a specific handler
      Object.keys(this._subs).forEach((key, i) => {
        let index = this._subs[key].indexOf(identifier);
        if(index > -1) delete this._subs[key][index];
      })
    } else {
      // removes all handlers for a specific key
      delete this._subs[identifier];
    }
  }

  set(key, value, overwrite=true) {
    let oldValue = this._store.get(key);
    this._store.set(key, value, overwrite);
    this._subs[key] && this._subs[key].forEach((handler) => {
      handler(key, value, oldValue);
    });

    this._eventUnit.emit('set');
  }

  native() {
    return this._store;
  }
}

window.appStorage = new Storage();
window.appStorage._eventUnit.mute();
export let storage = window.appStorage;