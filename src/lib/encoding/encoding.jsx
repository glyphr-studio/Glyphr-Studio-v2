export function toHex(subject) {
  let hex, i;

  let result = "";
  for (i = 0; i < subject.length; i++) {
    hex = subject.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result
}

export function fromHex(hex) {
  let j;
  let hexes = hex.match(/.{1,4}/g) || [];
  let back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

export function toUnicode(subject) {
  return ["Ux", toHex(subject)].join("");
}

export function fromUnicode(unicode) {
  return fromHex(unicode.match(/^Ux([a-z]*[0-9]*)/)[1]);
}