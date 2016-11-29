export function make_path() {
  var segments = [],
      path;

  Array.prototype.forEach.call(arguments, function (seg) {
    segments.push(seg);
  });

  // Replace two or more consecutive slashes (//...) with a single slash
  path = segments.join('/').replace(/\/{2,}/g, '/');

  return path;
}

export function to_unicode(char) {
  var unicodeString = '';
  for (var i = 0; i < char.length; i++) {
    var unicode = char.charCodeAt(i).toString(16).toUpperCase();
    while (unicode.length < 4) {
      unicode = '0' + unicode;
    }
    unicode = '\\u' + unicode;
    unicodeString += unicode;
  }
  return unicodeString;
}

export function to_key_code(char) {
  return char.charCodeAt();
}

export function get_latin_letters() {
  return Array.apply(0, Array(26)).map(function (val, i) {
    return String.fromCharCode(i + 65);
  })
}

export function get_latin_letter_zigzag() {
  var zigzag = [];
  Array.apply(0, Array(26)).forEach(function (val, i) {
    zigzag.push(String.fromCharCode(i + 65));
    zigzag.push(String.fromCharCode(i + 65).toLowerCase());
  });
  return zigzag;
}

export function get_arabic_digits() {
  return Array.apply(0, Array(10)).map(function (val, i) {
    return i;
  });
}

export function unfold_dot_notation(path, bag) {
  var container;

  key.split('.').forEach((segment) => {
    container = container && container[segment] || bag[segment];
  });

  return container;
}

/**
 * @link  https://gist.github.com/mechanicious/9049349947d2985055950c858c870182
 * @param ob
 * @returns {{}}
 */
export function flatten_object(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      var flatObject = flatten_object(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};