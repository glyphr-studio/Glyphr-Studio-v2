var locale = require('./' + 'en' + '/Tags');

class Locale {

  // to generate the doc 1. flatten the Tags.json object with object_flatten ...

  /**
   * @example get('icons.undo')
   * @param key {('app.numericVersion'|'app.alphaVersion'|'item.shape'|'item.glyph'|'item.component'|'icon.undo'|'icon.paste'|'icon.getShape'|'icon.addShape'|'icon.addComponent'|'icon.flipVertical'|'icon.flipHorizontal'|'signType.capitalLetter'|'signType.digit'|'shapeAction.undo'|'shapeAction.paste'|'shapeAction.addShape'|'shapeAction.addComponent'|'shapeAction.getShape'|'shapeAction.flipVertical'|'shapeAction.flipHorizontal'|'layersPanel.noShapesExist')}
   * @description
        app.numericVersion  – current app version e.g. "0.0.0"
        app.alphaVersion    – e.g. "Alpha 2"
        item.shape
        item.glyph
        item.component
        icon.undo
        icon.paste
        icon.getShape
        icon.addShape
        icon.addComponent
        icon.flipVertical
        icon.flipHorizontal
        signType.capitalLetter
        signType.digit
        shapeAction.undo
        shapeAction.paste
        shapeAction.addShape
        shapeAction.addComponent
        shapeAction.getShape
        shapeAction.flipVertical
        shapeAction.flipHorizontal
        layersPanel.noShapesExist
   * @returns {string}
   */
  get(key) {
    var translation;

    key.split('.').forEach((segment) => {
      translation = translation && translation[segment] || locale[segment];
    });

    if(! translation || typeof translation !== "string") {
      throw new TypeError('Locale: ' + typeof translation + ' is not a string. Cannot translate ' + key);
    }

    return translation;
  }
}

export default new Locale;