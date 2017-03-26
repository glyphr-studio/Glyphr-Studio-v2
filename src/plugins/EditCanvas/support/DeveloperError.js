export default class DeveloperError extends Error {
  constructor() {
    return super(...arguments);
  }
}