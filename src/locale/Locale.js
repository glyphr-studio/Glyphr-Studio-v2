var locale = require('./' + 'en' + '/Tags');

class Locale {

  // usage example: get('icons.undo');
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