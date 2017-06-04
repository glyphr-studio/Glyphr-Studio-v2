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

  export function json(obj, raw) {
    obj = clone(obj);
    if(raw) return JSON.stringify(obj);
    else {
      var j = JSON.stringify(obj, undefined, '\t');
      if(j) return j.replace(/\n/g, '\r\n');
      else return '';
    }
  }

 /**
  * http://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
  * @param filename
  * @param text
  */
  export function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  }

 /**
  * Generate a random key
  * @param {number} length            default length is 10
  * @param {string} charactersToUse   alphanumeric characters by default
  * @return {string}
  */
 function random_key(length = 10, charactersToUse = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ") {
   function number (n) {
     if (!n) return 10;
     return (typeof n === 'number') ? n : parseInt(n, 10);
   }
   var str = '';
   if (typeof length === 'object') { // cheap array check
     var min = number(length[0]);
     var max = number(length[1]);
     length = Math.round(Math.random() * (max - min)) + min;
   } else {
     length = number(length);
   }
   charactersToUse = charactersToUse || randomKey.default;
   for (var i = 0; i < length; i++) {
     str += charactersToUse.charAt(Math.floor(Math.random() * charactersToUse.length));
   }
   return str;
 }

//-------------------
// Common Functions
//-------------------
  // returns a full new copy of any object
  // 'parentpath' is a PathPoint property that is a pointer to it's parent Path
  // causes infinite loops when cloning objects.  Kind of a hack.
  export function clone(cobj){
    var newObj = (cobj instanceof Array) ? [] : {};
    for (var i in cobj) {
      if (cobj[i] && typeof cobj[i] === 'object' && i !== 'parentpath' && i !== 'cache') {
        newObj[i] = clone(cobj[i]);
      } else newObj[i] = cobj[i];
    }
    return newObj;
  }

  // rounds a number to include a .5 so it draws nicely on canvas
  // true = +0.5, false = -0.5
  Number.prototype.makeCrisp = function(dir){
    var mul = dir? 1 : -1;
    return round(this) + (0.5 * mul);
  };

  // better rounding than Math.round
  export function round(num, dec){
    if(!num) return 0;
    dec = dec || 0;
    return Number(Math.round(num+'e'+dec)+'e-'+dec) || 0;
  }

  // floating point numbers make me mad
  export function numSan(num) {
    num = parseFloat(num);
    var strnum = ''+num;

    if(strnum.indexOf('0000') > -1 || strnum.indexOf('9999') > -1){
      num = round(num, 6);
    }

    if(num < 0.0000 && num > 0) num = 0;

    return num;
  }

  // removes illegal file name chars
  export function strSan(val){
    return val.replace(/[<>'"\\]/g,"");
  }

  // removes begining and trailing whitespace, and any breaking or tab chars
  export function trim(text) {
    try {
      text = text.replace(/^\s+|\s+$/g, '');
      return text.replace(/(\r\n|\n|\r|\t)/gm, '');
    } catch(e) { return ''; }
  }

  // returns true for 0 and false
  export function isval(val){
    if(val === 0) return true;
    else if (val === false) return true;
    else if(val === null || val === undefined) return false;
    else if ( typeof val === 'object' && Object.keys(val).length === 0 ) return false;
    else return !!val;
  }

  export function getOverallMaxes(maxarr) {
    // debug('\n getOverallMaxes - START');
    // debug('\t start');
    // debug(maxarr);

    var re = clone(_UI.mins);
    var tm;

    for(var m=0; m<maxarr.length; m++){
      // debug('\t pass ' + m);
      tm = maxarr[m];
      // debug([tm]);

      // sanitize
      if(!isval(tm.xmax)) tm.xmax = clone(_UI.mins.xmax);
      if(!isval(tm.xmin)) tm.xmin = clone(_UI.mins.xmin);
      if(!isval(tm.ymax)) tm.ymax = clone(_UI.mins.ymax);
      if(!isval(tm.ymin)) tm.ymin = clone(_UI.mins.ymin);
      // debug([tm]);

      // find
      re.xmax = Math.max(re.xmax, tm.xmax);
      re.xmin = Math.min(re.xmin, tm.xmin);
      re.ymax = Math.max(re.ymax, tm.ymax);
      re.ymin = Math.min(re.ymin, tm.ymin);
      // debug([re]);
    }
    // debug(' getOverallMaxes - END\n');

    return re;
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

 /**
  * @link https://stackoverflow.com/questions/9960908/permutations-in-javascript
  * @param input
  * @return {*}
  */
 export function permute(input) {
   let i, ch;
   for (i = 0; i < input.length; i++) {
     ch = input.splice(i, 1)[0];
     usedChars.push(ch);
     if (input.length == 0) {
       permArr.push(usedChars.slice());
     }
     permute(input);
     input.splice(i, 0, ch);
     usedChars.pop();
   }
   return permArr
 };