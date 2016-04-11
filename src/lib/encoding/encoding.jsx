export function toHex(subject) {
  var hex, i;

  var result = "";
  for (i = 0; i < subject.length; i++) {
    hex = subject.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

export function fromHex(subject) {
  var j;
  var hexes = subject.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}