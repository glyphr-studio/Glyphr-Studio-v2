import store from "store2";

class Storage {
  toDestroy = [];
  subs = {};
  store = store;

  once(key: string, value) {
    this.store.set(key, value);
    this.toDestroy.push(key);
  }

  get(key) {
    var value = this.store.get(key);
    if(this.toDestroy.includes(key)) this.store.remove(key);
    return value;
  }


  subscribe(key, handler, context, data) {
    if(! this.subs[key]) this.subs[key] = [];
    var handler = handler.bind(context || this, data);
    this.subs[key].push(handler);

    return handler;
  }

  unsubscribe(identifier) {
    if(typeof identifier === "function") {
      // remove a specific handler
      Object.keys(this.subs).forEach((key, i) => {
        var index = this.subs[key].indexOf(identifier);
        if(index > -1) delete this.subs[key][index];
      })
    } else {
      // removes all handlers for a specific key
      delete this.subs[identifier];
    }
  }

  set(key, value, overwrite=false) {
    var oldValue = this.store.get(key);
    this.store.set(key, value, overwrite);

    this.subs[key].forEach((handler) => {
      handler(key, value, oldValue);
    })
  }

  native() {
    return this.store;
  }
}

export default new Storage();