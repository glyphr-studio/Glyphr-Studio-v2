import './../../utils/Colors';

export function makeToolButton(oa) {

  let cursors = {
    pointer: {
      fill: '<rect x="11" y="14" width="1" height="4"/><rect x="12" y="16" width="1" height="2"/><rect x="9" y="12" width="1" height="2"/><rect x="5" y="3" width="2" height="1"/><rect x="10" y="7" width="1" height="9"/><rect x="5" y="6" width="5" height="6"/><rect x="12" y="9" width="1" height="3"/><rect x="11" y="8" width="1" height="4"/><rect x="14" y="11" width="1" height="1"/><rect x="13" y="10" width="1" height="2"/><rect x="5" y="15" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="5" y="14" width="2" height="1"/><rect x="5" y="13" width="3" height="1"/><rect x="5" y="4" width="3" height="1"/><rect x="5" y="12" width="4" height="1"/><rect x="5" y="5" width="4" height="1"/>',
      outline: '<rect x="4" width="1" height="17"/><rect x="5" y="1" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="11" y="7" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="11" y="12" width="5" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="13" y="9" width="1" height="1"/><rect x="14" y="10" width="1" height="1"/><rect x="15" y="11" width="1" height="1"/><rect x="11" y="18" width="2" height="1"/><rect x="5" y="16" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="7" y="14" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="14" width="1" height="2"/><rect x="10" y="16" width="1" height="2"/><rect x="11" y="12" width="1" height="2"/><rect x="12" y="14" width="1" height="2"/><rect x="13" y="16" width="1" height="2"/>'
    },

    penPlus: {
      fill: '<rect x="5" y="4" width="5" height="14"/><rect x="10" y="8" width="2" height="6"/><rect x="3" y="8" width="2" height="6"/>',
      outline: '<rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="4" y="16" width="1" height="3"/><rect x="10" y="16" width="1" height="3"/><rect x="7" y="1" width="1" height="12"/><rect x="4" y="18" width="7" height="1"/><rect x="4" y="16" width="7" height="1"/><rect x="8" y="2" width="1" height="2"/><rect x="9" y="4" width="1" height="2"/><rect x="10" y="6" width="1" height="2"/><rect x="3" y="8" width="1" height="2"/><rect x="2" y="10" width="1" height="2"/><rect x="12" y="10" width="1" height="2"/><rect x="6" y="10" width="3" height="2"/><rect x="3" y="12" width="1" height="2"/><rect x="4" y="14" width="1" height="2"/><rect x="6" y="2" width="1" height="2"/><rect x="5" y="4" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="11" y="8" width="1" height="2"/><rect x="11" y="12" width="1" height="2"/><rect x="10" y="14" width="1" height="2"/>'
    },

    penMinus: {
      fill: '<rect x="5" y="4" width="5" height="14"/><rect x="10" y="8" width="2" height="6"/><rect x="3" y="8" width="2" height="6"/>',
      outline: '<rect x="14" y="16" width="5" height="1"/><rect x="4" y="16" width="1" height="3"/><rect x="10" y="16" width="1" height="3"/><rect x="7" y="1" width="1" height="12"/><rect x="4" y="18" width="7" height="1"/><rect x="4" y="16" width="7" height="1"/><rect x="8" y="2" width="1" height="2"/><rect x="9" y="4" width="1" height="2"/><rect x="10" y="6" width="1" height="2"/><rect x="3" y="8" width="1" height="2"/><rect x="2" y="10" width="1" height="2"/><rect x="12" y="10" width="1" height="2"/><rect x="6" y="10" width="3" height="2"/><rect x="3" y="12" width="1" height="2"/><rect x="4" y="14" width="1" height="2"/><rect x="6" y="2" width="1" height="2"/><rect x="5" y="4" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="11" y="8" width="1" height="2"/><rect x="11" y="12" width="1" height="2"/><rect x="10" y="14" width="1" height="2"/>'
    },

    pen: {
      fill: '<rect x="7" y="4" width="5" height="14"/><rect x="12" y="8" width="2" height="6"/><rect x="5" y="8" width="2" height="6"/>',
      outline: '<rect x="6" y="16" width="1" height="3"/><rect x="12" y="16" width="1" height="3"/><rect x="9" y="1" width="1" height="12"/><rect x="6" y="18" width="7" height="1"/><rect x="6" y="16" width="7" height="1"/><rect x="10" y="2" width="1" height="2"/><rect x="11" y="4" width="1" height="2"/><rect x="12" y="6" width="1" height="2"/><rect x="5" y="8" width="1" height="2"/><rect x="4" y="10" width="1" height="2"/><rect x="14" y="10" width="1" height="2"/><rect x="8" y="10" width="3" height="2"/><rect x="5" y="12" width="1" height="2"/><rect x="6" y="14" width="1" height="2"/><rect x="8" y="2" width="1" height="2"/><rect x="7" y="4" width="1" height="2"/><rect x="6" y="6" width="1" height="2"/><rect x="13" y="8" width="1" height="2"/><rect x="13" y="12" width="1" height="2"/><rect x="12" y="14" width="1" height="2"/>'
    },

    slice: {
      fill: '<polygon points="6,15 6,19 13,19 13,1 "/>',
      outline: '<rect x="13" width="1" height="16"/><rect x="6" y="19" width="7" height="1"/><rect x="6" y="17" width="1" height="3"/><rect x="12" y="16" width="1" height="4"/><rect x="6" y="17" width="7" height="1"/><rect x="11" y="3" width="1" height="2"/><rect x="12" y="1" width="1" height="2"/><rect x="10" y="5" width="1" height="2"/><rect x="9" y="7" width="1" height="2"/><rect x="8" y="9" width="1" height="2"/><rect x="7" y="11" width="1" height="2"/><rect x="6" y="13" width="1" height="2"/><rect x="5" y="15" width="1" height="2"/>'
    },

    shapeResize: {
      fill: '<rect x="1" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="8" y="8" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="15" y="1" display="inline" fill="#FFFFFF" width="4" height="4"/><rect x="1" y="15" display="inline" fill="#FFFFFF" width="4" height="4"/>',
      outline: '<rect x="16" y="5" width="1" height="10"/><rect x="5" y="16" width="10" height="1"/><rect x="5" y="3" width="10" height="1"/><rect x="3" y="5" width="1" height="10"/><rect x="1" y="1" width="4" height="1"/><rect x="1" y="4" width="4" height="1"/><rect x="1" y="1" width="1" height="4"/><rect x="4" y="1" width="1" height="4"/><rect x="15" y="1" width="4" height="1"/><rect x="15" y="4" width="4" height="1"/><rect x="15" y="1" width="1" height="4"/><rect x="18" y="1" width="1" height="4"/><rect x="15" y="15" width="4" height="1"/><rect x="15" y="18" width="4" height="1"/><rect x="15" y="15" width="1" height="4"/><rect x="18" y="15" width="1" height="4"/><rect x="1" y="15" width="4" height="1"/><rect x="1" y="18" width="4" height="1"/><rect x="1" y="15" width="1" height="4"/><rect x="4" y="15" width="1" height="4"/><rect x="8" y="8" width="4" height="1"/><rect x="8" y="11" width="4" height="1"/><rect x="8" y="8" width="1" height="4"/><rect x="11" y="8" width="1" height="4"/>'
    },

    newRect: {
      fill: '<rect x="2" y="2" width="12" height="12"/>',
      outline: '<rect x="1" y="1" width="13" height="1"/><rect x="1" y="13" width="13" height="1"/><rect x="14" y="16" width="5" height="1"/><rect x="1" y="2" width="1" height="12"/><rect x="13" y="2" width="1" height="12"/><rect x="16" y="14" width="1" height="5"/>'
    },

    newOval: {
      fill: '<rect x="6" y="2" width="4" height="1"/><rect x="6" y="12" width="4" height="1"/><rect x="5" y="10.1" width="4" height="1"/><rect x="2" y="6" width="1" height="3"/><rect x="13" y="6" width="1" height="3"/><rect x="11" y="5.1" width="1" height="3"/><rect x="3" y="3" width="10" height="9"/>',
      outline: '<rect x="6" y="1" width="4" height="1"/><rect x="4" y="2" width="2" height="1"/><rect x="6" y="13" width="4" height="1"/><rect x="1" y="6" width="1" height="3"/><rect x="2" y="4" width="1" height="2"/><rect x="10" y="2" width="2" height="1"/><rect x="13" y="4" width="1" height="2"/><rect x="4" y="12" width="2" height="1"/><rect x="2" y="9" width="1" height="2"/><rect x="10" y="12" width="2" height="1"/><rect x="13" y="9" width="1" height="2"/><rect x="14" y="6" width="1" height="3"/><rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="12" y="3" width="1" height="1"/><rect x="12" y="11" width="1" height="1"/><rect x="3" y="11" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/>'
    },

    newPath: {
      fill: '<rect x="5" y="2" width="5" height="13"/><rect x="10" y="4" width="2" height="11"/><rect x="3" y="9" width="2" height="6"/><rect x="6" y="15" width="3" height="1"/><rect x="12" y="6" width="2" height="7"/><rect x="2" y="2" width="3" height="1"/><rect x="4" y="3" width="3" height="1"/>',
      outline: '<rect x="14" y="16" width="5" height="1"/><rect x="16" y="14" width="1" height="5"/><rect x="8" y="2" width="2" height="1"/><rect x="2" y="1" width="6" height="1"/><rect x="6" y="16" width="3" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="12" y="5" width="1" height="1"/><rect x="1" y="1" width="1" height="2"/><rect x="2" y="3" width="2" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="2" y="10" width="1" height="4"/><rect x="3" y="9" width="1" height="1"/><rect x="3" y="14" width="1" height="1"/><rect x="5" y="5" width="1" height="3"/><rect x="4" y="8" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/><rect x="11" y="14" width="1" height="1"/><rect x="9" y="15" width="2" height="1"/><rect x="4" y="15" width="2" height="1"/><rect x="13" y="11" width="1" height="2"/><rect x="13" y="6" width="1" height="2"/><rect x="14" y="8" width="1" height="3"/>'
    },

    popOut: {
      outline: '<rect x="18" y="1" width="1" height="11"/><rect x="6" y="1" width="2" height="11"/><rect x="6" y="1" width="13" height="1"/><rect x="6" y="11" width="13" height="1"/><rect x="13" y="11" width="1" height="8"/><rect x="1" y="8" width="2" height="11"/><rect x="1" y="8" width="7" height="1"/><rect x="1" y="18" width="13" height="1"/' + '>'
    },

    popIn: {
      outline: '<rect x="1" y="1" width="2" height="18"/><rect x="7" y="1" width="2" height="18"/><rect x="18" y="1" width="1" height="17"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/>'
    },

    zoomEm: {
      outline: '<polygon points="15,3 11,3 11,5 13,5 13,6 12,6 12,7 11,7 11,8 10,8 9,8 9,7 8,7 8,6 7,6 7,5 9,5 9,3 5,3 3,3 3,5 3,9 5,9 5,7 6,7 6,8 7,8 7,9 8,9 8,10 8,11 7,11 7,12 6,12 6,13 5,13 5,11 3,11 3,15 3,17 5,17 9,17 9,15 7,15 7,14 8,14 8,13 9,13 9,12 10,12 11,12 11,13 12,13 12,14 13,14 13,15 11,15 11,17 15,17 17,17 17,15 17,11 15,11 15,13 14,13 14,12 13,12 13,11 12,11 12,10 12,9 13,9 13,8 14,8 14,7 15,7 15,9 17,9 17,5 17,3"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="18" width="18" height="1"/><rect x="1" y="1" width="18" height="1"/><rect x="1" y="1" width="1" height="18"/>'
    },

    zoom1to1: {
      outline: '<rect x="5" y="4" width="2" height="12"/><rect x="14" y="4" width="2" height="12"/><rect x="18" y="1" width="1" height="18"/><rect x="1" y="1" width="1" height="18"/><rect x="13" y="5" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="9" y="11" width="2" height="2"/><rect x="9" y="7" width="2" height="2"/><rect x="1" y="1" width="18" height="1"/><rect x="1" y="18" width="18" height="1"/>'
    },

    zoomIn: {
      outline: '<rect x="9" y="3" width="2" height="14"/><rect x="3" y="9" width="14" height="2"/>'
    },

    zoomOut: {
      outline: '<rect x="3" y="9" width="14" height="2"/>'
    },

    pan: {
      fill: '<rect x="9" y="1" width="2" height="18"/><rect x="1" y="9" width="18" height="2"/><rect x="2" y="7" width="2" height="6"/><rect x="7" y="16" width="6" height="2"/><rect x="16" y="7" width="2" height="6"/><rect x="7" y="2" width="6" height="2"/>',
      outline: '<rect x="8" y="4" width="1" height="5"/><rect x="8" y="11" width="1" height="5"/><rect x="11" y="4" width="1" height="5"/><rect x="11" y="11" width="1" height="5"/><rect x="4" y="8" width="4" height="1"/><rect x="11" y="8" width="5" height="1"/><rect x="4" y="11" width="4" height="1"/><rect x="4" y="12" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="2" y="12" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect x="0" y="9" width="1" height="2"/><rect x="1" y="8" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="11" y="11" width="5" height="1"/><rect x="12" y="15" width="2" height="1"/><rect x="6" y="15" width="2" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="13" y="16" width="1" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="9" y="19" width="2" height="1"/><rect x="8" y="18" width="1" height="1"/><rect x="7" y="17" width="1" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="15" y="6" width="1" height="2"/><rect x="15" y="12" width="1" height="2"/><rect x="17" y="7" width="1" height="1"/><rect x="16" y="6" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="19" y="9" width="1" height="2"/><rect x="18" y="11" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="6" y="4" width="2" height="1"/><rect x="12" y="4" width="2" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="9" y="0" width="2" height="1"/><rect x="11" y="1" width="1" height="1"/><rect x="12" y="2" width="1" height="1"/><rect x="13" y="3" width="1" height="1"/>'
    },

    kern: {
      fill: '<rect x="1" y="9" width="18" height="2"/><rect x="2" y="7" width="2" height="6"/><rect x="16" y="7" width="2" height="6"/>',
      outline: '<rect x="4" y="8" width="12" height="1"/><rect x="4" y="11" width="12" height="1"/><rect x="4" y="12" width="1" height="2"/><rect x="4" y="6" width="1" height="2"/><rect x="2" y="12" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect y="9" width="1" height="2"/><rect x="1" y="8" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="15" y="6" width="1" height="2"/><rect x="15" y="12" width="1" height="2"/><rect x="17" y="7" width="1" height="1"/><rect x="16" y="6" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="19" y="9" width="1" height="2"/><rect x="18" y="11" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="9" y="2" width="2" height="16"/>'
    }
  };


  let color_outline = colors.blue.l75;
  let color_fill = colors.gray.l40;

  if (oa.selected) {
    color_outline = 'black';
    color_fill = 'white';
  } else if (oa.disabled) {
    color_outline = colors.gray.l40;
    color_fill = colors.gray.l30;
  }

  let re = '<svg version="1.1" ';
  re += 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ';
  re += 'x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20"> ';

  let ic = cursors[oa.name];
  if (ic.fill) {
    re += '<g pointer-events="none" fill="' + color_fill + '">';
    re += ic.fill;
    re += '</g>';
  }

  re += '<g pointer-events="none" fill="' + color_outline + '">';
  re += ic.outline;
  re += '</g>';

  re += '</svg>';

  return re;
}

