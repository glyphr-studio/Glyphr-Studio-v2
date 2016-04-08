export function make_path() {
  var segments = [],
      path;

  Array.prototype.forEach.call(arguments, function(seg) {
    segments.push(seg);
  });
  path  = segments.join('/').replace(/\/{2,}/g, '/');

  return path;
}

export function to_unicode(char) {
  var unicodeString = '';
  for (var i=0; i < char.length; i++) {
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