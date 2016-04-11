import store from "store2";

class Storage {
  _toDestroy = [];
  _subs = {};
  _store = store;

  once(key: string, value) {
    this._store.set(key, value);
    this._toDestroy.push(key);
  }

  get(key) {
    var value = this._store.get(key);
    if(this._toDestroy.includes(key)) this._store.remove(key);
    return value;
  }


  subscribe(key, handler, context, data) {
    if(! this._subs[key]) this._subs[key] = [];
    var handler = handler.bind(context || this, data);
    this._subs[key].push(handler);

    return handler;
  }

  unsubscribe(identifier) {
    if(typeof identifier === "function") {
      // remove a specific handler
      Object.keys(this._subs).forEach((key, i) => {
        var index = this._subs[key].indexOf(identifier);
        if(index > -1) delete this._subs[key][index];
      })
    } else {
      // removes all handlers for a specific key
      delete this._subs[identifier];
    }
  }

  set(key, value, overwrite=true) {
    var oldValue = this._store.get(key);
    this._store.set(key, value, overwrite);

    this._subs[key] && this._subs[key].forEach((handler) => {
      handler(key, value, oldValue);
    })
  }

  native() {
    return this._store;
  }
}

export default new Storage();