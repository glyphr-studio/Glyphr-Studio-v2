export default class Access {
  _accessLevels = {};
  _currentAccessLevel = 0;
  _id = '';

  constructor(id, accessLevels, currentAccessLevel) {
    // Required arguments will speed up debugging, as without required arguments the
    // instantiation would pass, however some features would malfunction
    if(typeof id !== "string") throw new TypeError(`id must be of type string, ${typeof id} was given`);
    else if(typeof accessLevels !== "object") throw new TypeError(`accessLevels must be of type object, ${typeof accessLevels} was given`);
    else if(typeof currentAccessLevel !== "number") throw new TypeError(`currentAccessLevel must be of type number, ${typeof currentAccessLevel} was given`);

    this._accessLevels = accessLevels;
    // Since with "number" an integer is meant...
    this._currentAccessLevel = parseInt(currentAccessLevel);
    this._id = id;

    // Create accessor checks by unloading actions onto the class
    Object.keys(this._accessLevels).forEach((action) => {
      this[action] = (callback) => {
        if(! callback) throw new TypeError("Access: Callback must be a function");

        if(! this.hasPermission(action)) this.logError(action);
        else return callback();
      }
    })
  }

  hasPermission(action) {
    if(typeof this._accessLevels[action] === "undefined") throw new TypeError(`Action "${action}" is not specified.`);
    return this._currentAccessLevel >= this._accessLevels[action];
  }

  logError(action) {
    if(! this.hasPermission(action)) console.error(`${this.constructor.name}::${this._id}: permission to ${action} denied, current elevation is ${this._currentAccessLevel}, needed elevation is ${this._accessLevels[action]}`);
  }
}