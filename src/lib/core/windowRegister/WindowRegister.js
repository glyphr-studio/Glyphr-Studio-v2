export default class WindowRegister {
  _rootObjectName = "_gs2";
  _staticRootObjectName = "_static";
  _windowRegisterAccess = {};

  constructor(WindowRegisterAccess) {
    this._windowRegisterAccess = WindowRegisterAccess;

    // Initialize window registry onto the window object if needed
    if( ! window[this._rootObjectName]) {
      window[this._rootObjectName] = {
        [this._staticRootObjectName]: {}
      };
    }
  }

  getRoot() {
    // Ask for read access
    return this._windowRegisterAccess.read(() => {
      return window[this._rootObjectName];
    });
  }

  getStatic(name) {
    return this._windowRegisterAccess.read(() => {
      return name ? window[this._rootObjectName][this._staticRootObjectName][name] :
        window[this._rootObjectName][this._staticRootObjectName];
    });
  }

  attachStatic(object) {
    return this._windowRegisterAccess.write(() => {
      return window[this._rootObjectName][this._staticRootObjectName] = Object.assign(this.getStatic(), object);
    });

  }

  detachStatic(object) {
    return this._windowRegisterAccess.write(() => {
      for(sObject in window[this._rootObjectName][this._staticRootObjectName]) {
        var current = window[this._rootObjectName][this._staticRootObjectName][sObject];
        if(current === object) {
          delete window[this._rootObjectName][this._staticRootObjectName][sObject];
          return current;
        }
      }
    });
  }
}