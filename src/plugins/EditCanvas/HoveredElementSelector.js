import Combinatorics from "js-combinatorics";

window.comb = Combinatorics;

export default class HoveredElementSelector {
  _rawSelector;

  /**
   * Get a selector instance
   *
   * @param {String} selector
   */
  constructor(selector) {
    this._rawSelector = selector;
    return this;
  }

  /**
   * @return Array<String>
   */
  get matches() {
    let targets = [];
    const targetRoot = [];
    const targetRootSuffix = [];

    this._rawSelector.split(" ").forEach((tag) => {
      if(tag.indexOf("?") === -1) {
        targetRoot.push(tag);
      } else {
        targetRootSuffix.push(tag.split("?")[1]);
      }
    });

    targets = targets.concat(targetRoot);

    if(targetRootSuffix.length > 0) {
      Combinatorics.permutationCombination(targetRootSuffix).forEach((result) => {
        targets.push([...result, ...targetRoot].join(" "));
      });
    }

    return targets;
  }

  /**
   * Check whether the selector and the type match
   * @param {String} type
   * @return {Boolean}
   */
  isMatching(type) {
    let found = false;

    this.matches.forEach((match) => {
      if(type === match) {
        found = true;
      }
    });

    return found;
  }
}