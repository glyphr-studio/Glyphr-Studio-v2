export default class AbstractImplementationGuard {
  _interfaceClass;

  constructor(interfaceClass) {
    this._interfaceClass = interfaceClass;
  }

  riseImplementationMissing(methodName, signature) {
    throw new AbstractImplementationMissing(`An implementation of method ${methodName}${signature} is missing from ${this._interfaceClass.constructor.name}. Check whether you have implemented all methods from the extending class.`);
  }
}

class AbstractImplementationMissing extends Error{
  constructor() {
    super(...arguments);
  }
}