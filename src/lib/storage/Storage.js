import store from "store2";

class Storage {
  toDestroy = [];
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

  native() {
    return this.store;
  }
}

export default new Storage();