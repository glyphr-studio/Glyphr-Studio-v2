/**
 *  Singleton pattern
 */

let instance;

export default class CanvasCursor {
  _currentCursor = null;
  _defaultCursor = "";
  _cursorHistory = [];
  _canvas = null;

  /**
   * Get a cursor manager for the canvas
   *
   * @param {HTMLCanvasElement} canvas
   * @param {function} cursor – returns cursor name & used to revert to previous cursor
   */
  constructor(canvas, cursor) {
    this._canvas = canvas;

    let defaultCursor = () => "default";

    if(typeof instance === "undefined") {

      instance = this;
    }

    this.push(cursor || defaultCursor);
  }

  get current() {
    return instance._currentCursor;
  }

  hasCursor(handler) {
    return this._cursorHistory.indexOf(handler) > 0 || this._currentCursor === handler;
  }

  /**
   * Revert back to the previous cursor
   *
   * @param {function} handler
   */
  pop(handler) {
    let index = instance._cursorHistory.indexOf(handler);
    if(typeof instance._cursorHistory[index-1] === "undefined") {
      throw new Error(`CanvasCursor: no previous cursor found, cursor has not been reverted. instance error might indicate a wrong assumption in your code!`);
    } else {
      instance.push(instance._cursorHistory[index-1], true);
      instance._cursorHistory.splice(index, 1);
    }
  }

  /**
   * Set a cursor
   *
   * @param {function} handler – returns handler name as argument
   * @param {boolean} silent – internal use only
   */
  push(handler, silent = false) {
    console.log(instance)
    let customCursors = {
      // pointer: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAdCAYAAACnmDyCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPJJREFUeNpiYNB2/M9ABcAEJqlgGNigLYtmUMEwoAEPv/7/v+Xszf+UGQY1iFLDmJA5uhpqZHuTCV2AXMOYsAmSYxgTLglSDWPCJ0mKYUyEFBBrGBMxzibGMCZiA5OQYUykRDE+w5hITXi4DGMiJztgM4yJ3CyKbhgTJQUHsmEspGiUN3PCKcdCoiHSJBkEs/nhqX2oElf3PyM6QUINMQFhZK8QStksWA25uv8stPRECVii8hqGIUDg7WLvR7yrQBIQbEyoTAdhfHnNBN0lyKAwNT6dlLAiuqbB5Sqi0lF7VVEj0FX1SEImlFamxrjCEiDAABxblO2iGQyVAAAAAElFTkSuQmCC") 0 0, default',
      // pointerCircle: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaJJREFUeNpiYNB2/M9AB8AEJulgGdiiLYtm0MEyoAUPv/7/v+Xszf+0tQxqEa0tY0Lm6Gqo0SwYmdAFaGUZEzZBWljGhEuC2pYx4ZOkpmVMhBRQyzImYhRRwzImYhVSahkTKYopsYyJVA3kWsZETjCQYxkTuZFLqmVMlCRZUixjIcVgeTMnsh3FQqIl0lS1CObyh6f2oUpc3f+MahkWaokJCCMHFd640HYMAOL7YHkIvg8Ww1XDQhUZY5ODy2OxhM/C93/vyh1wdfVz1/wHiaFaBjUMwxIg8M5v8CVY1QNdj2wJDIPEwD6DAkYkjSbAODiLtU2BFFfg4Ly6nxEqJwAk32PEJWo0KALVP2CCxQdWS4CgMDU+nei4wg6EgeqFmcAW4LAEBPoLEmahZ1KkVPgBSD5Ys2Unhr55K9aCqOdQLjtR+ai9qqgR6Kt6JCETZE839k9d/+nLF4akiGCwAMji/tkLQcxeRByR1gY0hvrkLEbyBnoeiBWgIs+hlhyA8h8wMlATaDsqgOMEFbwFJQbqWgSxDGQRO5T3E2jJWxADIMAAQ+gDzqOrNPQAAAAASUVORK5CYII=") 0 0, default',
      // pointerMinus: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAShJREFUeNpiYNB2/M9AB8AEJulgGdiiLYtm0MEyoAUPv/7/v+Xszf+0tQxqEa0tY0Lm6Gqo0SwYmdAFaGUZEzZBWljGhEuC2pYx4ZOkpmVMhBRQyzImYhRRwzImYhVSahkTKYopsYyJVA3kWsZETjCQYxkTuZFLqmVMlCRZUixjIcVgeTMnsh3FQqIl0lS1CObyh6f2oUpc3f+MahkWaokJCCMHFaUlAwtWS67uPwutfVEiniplHYYlQODtYu9HLV8xImlEsQSlTYEUV2CLr+5nRJYnaAtYvbajMRjjAIUTFqThbcAgyWHDMLWMRLeUcPmKSB8RlY/aq4oagYbXIwmZoASLtqMUkCWJQ/tz4n2E8Jkx1PCzaOK8QJIXh67PQPWfGYYdAAgwAMo/uhuR9L9QAAAAAElFTkSuQmCC") 0 0, default',
      // pointerPlus: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVxJREFUeNpiYNB2/M9AB8AEJulgGdiiLYtm0MEyoAUPv/7/v+Xszf+0tQxqEa0tY0Lm6Gqo0SwYmdAFaGUZEzZBWljGhEuC2pYx4ZOkpmVMhBRQyzImYhRRwzImYhVSahkTKYopsYyJVA3kWsZETjCQYxkTuZFLqmVMlCRZUixjIcVgeTMnsh3FQqIl0lS1CObyh6f2oUpc3f+MahkWaokJCCMHFVFxAZKHYXwWwS25uv8sGKNFPDEAIxTQLUKxBAq8Xez9SPYVwndSQMyLEkfYLAGBrRMbNgMV4/cVboufQuVBccsIYhiDMQ5QOGFBGt4GDJIcNgyNM15GoltKSGEPDgGwKzF9BFKHJb9JE5WP2quKGoGa65GETJCSPCM8TmDBha4GCBhJygywIEaLS6gcKOI/IfkIZNFnIP4CohkZqAlQgxFk0XNYJmeiqkWQYOSDFlXPoT4CA4AAAwCK8s/Dau8eIAAAAABJRU5ErkJggg==") 0 0, default',
      // pointerSquare: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAfCAYAAAD5h919AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUNJREFUeNpiYNB2/M9AB8AEJulgGdiiLYtm0MEyoAUPv/7/v+Xszf+0tQxqEa0tY0Lm6Gqo0SwYmdAFaGUZEzZBWljGhEuC2pYx4ZOkpmVMhBRQyzImYhRRwzImYhVSahkTKYopsYyJVA3kWsZETjCQYxkTuZFLqmVMlCRZUixjIcVgeTMnsh3FQqIl0lS1CObyh6f2oUpc3f+MXIsYwRUfkoFQS0yg3DMwucs3bjH4xGWALGNErzjx2gBVz4LFJyZAybNQQ1AiHhfA8DmWOGXCaQkQeLvY+yErJqtU0HaUAmJeJlyWgMDWiQ2b0ZMzGUASiMEWmWCzBAYKU+PTKfYVOOhAFuCwBAT6CxJmUcFXxOWj9qqiRqCv6pGETEhP3qRFrDE0yZ4lOnlDHPWckYFaAJS6IBGPDTxnYaAe+IxPDiDAAB2lmR3ulvBGAAAAAElFTkSuQmCC") 0 0, default',
      //
      // slice: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAfCAYAAADXwvzvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAN1JREFUeNpiYNB2/M9ABmACk2RoZmIgE4A1blk0g2RbKbORHFspt5FUW1E06mqokR84xNqKoZFYW7EGDjG2YtVIjK04o4OQrTg1ErIVbwLAZytejfhsJZjkcNlKUCMuW4lK5NhsJUojNluJzlbotrIQo0nezAlDjIUYDQ9P7QPTl2/cYvCJy/jPcHU/IwtQUBCo4D2yk4CSGBoIp1+gPx5+/Q/GW87eRKFhbJAaokMVZCsIwFyDzUZjbLaCQxSCjYlyLi4NjDhtZWA4A+WZAEPxLPEFp7ZjGj5pgAADAHXih9fZ4xdeAAAAAElFTkSuQmCC") 0 0, default',
      // rotate: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUeNrclrFOw0AMQOMqG0KCL+gWUaFMjZgpMyMzK3wSM9/ATHfUThUCuvEFICHmcG7j4DjOna8JQmCpatXz+Z3PPtuQWOV4VnrXH+dgseFVev0sD8YnZ2/4++72xmvr/PJ6u+fh/nC8B+9dBwYrKD/KvMDV87ob7GBoB9dSbTPCrCAS0qN91YGBYLQOmutcgR3CC3QetTxGj7gttAEhGIHySTZbPa0/VO8m2b5bm0swQjVb37DlS+niV3/wv/zi6tR9Tw0ZOK10GzakvTpJpGINixULUHq3WbB4pcVf3JIEjmSWsYe8jIYpySZllAwhRhhKSsoik4rYkkcPPgzsf51FzGWkva8zMtbDxPDPATeF4McEHzirDvhwg822l4ci6NZ2NHgMf+Vad4FSIwiHRVT5naFVAQ/ngvCykUCWJKr0eLfQoNCCJslCdm1LrdRmoLous8RszTTYdHFc0GYUyxDlg3WOiQTVhqOQsLml0OoseGO6lYUF3AB5ijqYngwDd14pTXWB7gFRb3XANvV/5UuAAQBCI5UEkaELxQAAAABJRU5ErkJggg==") 14 15, default',
      //
      // pen: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARJJREFUeNpiYNB2/M9AEQAZQIEhTCAiJzGagVxDwAZIS4gzbFk0g0xDoF54+PX//y1nb5LhHSQDyDMEqBimiTxDoBqRDSDNEDT/k2oIE4yhq6GGIQkSIxw7WPyO7ApCLmFCtxEbwO8SXP6Gxg4hlzCCDTi1Dy4gb+aEYj6yHAhcvnGLwScug4Hh6n5GDC9gAyAN+LyJYUB7ZREKG1e4wAALukBUoA/EJk01gpqxGoBsCNHZmRIAMsAEPeTJKROMsaVAdIycPjATFR5DsCUsqFoDvIbgSpHIqZIRq3cYGM5gS4XoABR2jHhzKR4DYAGPMxqBCckRW+yAxKDiJrD8QFRZAa+AIF4kDrQv3dxASCNAgAEAZ9VjjmJBijwAAAAASUVORK5CYII=") 0 0, default',
      // penCircle: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcBJREFUeNpiYNB2/M8wAIAJTA6A5WCLcxKj6W452GJpCXGGLYtm0NlykGVA/PDr//9bzt78Ty/LmZA5uhpqdPQ50BKYT0G+ppfPmWA+pb/P0eIX5mta+5wJ2ZfogLY+xxK3yL6mlc8xUjU2QBuf44pXaGqnlc+Z0AV84jKwsqntcyZCCi7fuMVATHRQbHF7ZREKm1oWoQMWdIGoQB+IzzTVaGYpVouRLadbJUHv+thE3syJ7hYzQvOyMZA88/DUPryKYQ4EZSlwVru6nxGtTAgAkv1ArAAVeQDEhUB1G/AVJMbYiksQxlagQNUaIFvKZ+H7v3flDria+rlr/oPEoA5iINpyXCUY1lJM2/E+sqUwDBIDyWEPanTLgcEOYhIV9KDg1nYUAHLf41IPjSJFoNoHuFP11f1nMeIOT3yTAISBDhQmmJ2ABYgjNsNBYlBxE7gDr+7/AEpIa7bsxFA/b8VaEPUcymUnueaCxTc0KrCpBScuUIJCjl9o4iqGph8p3HGMXG4v3dxQ2dZXD+WagKMBv0PRsxPIp71AfACeva7uf0vQYgrqeAVwnKKCt8iJi5FmRRMkIcHi9CfMpzAAEGAAoeyCpVoYUnwAAAAASUVORK5CYII=") 0 0, default',
      // penMinus: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVhJREFUeNpiYNB2/M8wAIAJTA6A5WCLcxKj6W452GJpCXGGLYtm0NlykGVA/PDr//9bzt78Ty/LmZA5uhpqdPQ50BKYT0G+ppfPmWA+pb/P0eIX5mta+5wJ2ZfogLY+xxK3yL6mlc8xUjU2QBuf44pXaGqnlc8ZwRaf2gcXkDdzQlGALAcCl2/cYvCJy2BguLqfkWpBjQ2ALCImOii2uL2yCIVNLYvQAQu6QFSgD8Rnmmo0sxSrxciW062SoHd9bIKekulj8dX9Z4m1HKQGhKlbmGg7GmMrLkEYW4ECVWtAE8txlWDUKMUYsVrOwHAGW6mFLejhJRgxjkAq7ViwSJ6FFaUELUUD+BwKVq/tyAs0/zPOfAwtQByBivejG4ZkoQnUkXgdgwZ4gfgz9qBGr7mgFuOzEE2PFJCUxCH7HKj3GV4fg8vqqqJGoIX1RFmIAJ/JlBvmACDAAPWLM0aWt73RAAAAAElFTkSuQmCC") 0 0, default',
      // penPlus: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXpJREFUeNpiYNB2/M8wAIAJTA6A5WCLcxKj6W452GJpCXGGLYtm0NlykGVA/PDr//9bzt78Ty/LmZA5uhpqdPQ50BKYT0G+ppfPmWA+pb/P0eIX5mta+5wJ2ZfogLY+xxK3yL6mlc8xUjU2QBuf44pXaGqnlc+Z0AV84jKwsqntcyZCCi7fuMVATHRQbHF7ZREKm1oWoQMWdIGoQB+IzzTVaGYpVouRLadbJUHv+thE3sxpACy+uv8ssZaD1IAwwSwFLQeIy3bajsbYiksQxlagQNUa4CuUiM/vaJbjKsEIlmLIFms7SgExL7oSRqyWMzCcATEfntpHMOiBUcWIraUK0osRfTC1WC1GdjUei+GGIllMhHo+oPrPOPMxtABxBCrej24Yki9MoAkTmxx2HzMwgIIcv8WX18w8APQFURai+VwKSD5FkjEhuuSCl9VVRY1AC+vxWogJPuMQ+4Isx0iztjqqj58DHf2M9kUmJNj5QJ0UsKVYQgEgwACxwVGVMoHDYAAAAABJRU5ErkJggg==") 0 0, default',
      // penSquare: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWZJREFUeNpiYNB2/M8wAIAJTA6A5WCLcxKj6W452GJpCXGGLYtm0NlykGVA/PDr//9bzt78Ty/LmZA5uhpqdPQ50BKYT0G+ppfPmWA+pb/P0eIX5mta+5wJ2ZfogLY+xxK3yL6mlc8xUjU2QBuf44pXaGqnlc+Z0AV84jKwsqntcyZCCi7fuMVATHRQbHF7ZREKm1oWoQMWdIGoQB+IzzTVaGYpVouRLadbJUHv+thE3syJ7hYzQvOyMZA88/DUPryKYQ4EZSlwVru6nxGlXscHkNWiFSTG2IpLEMZWoEDVGuAqiDD0EyjFUCzHVYJhLcUIWaztKAXEvNhT9dX9Z4GSoDg/A+LiC3oyspoklP6MPVWDLMcZH5jxTfXsBCxAHLEZDhKDipsQ40CSChBwGb1m5gFgsGPzoQk4VGhRcsHL6qqiRqCF9cRaSErwM1K9ZAClXkRCQgfPgY5/RtDHZILPxMgBBBgA4nlavXX9OPwAAAAASUVORK5CYII=") 0 0, default',
      //
      // crosshairs: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHdJREFUeNpiYCAFaDvOB+L/YJpmAGjBw6///4MtIgEwMdABjFoyasngsWSBvJkTmGYYbIARWkQkEPIBw9X9iViLGSL0MoKLilP78KoCB9HV/YywogWZTYxeFmg4E/YJDMAsQMQR8XoHDxgt6kctGbVkaBf1AAEGAMBRMaRlDAehAAAAAElFTkSuQmCC") 12 12, crosshair',
      // crosshairsCircle: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASdJREFUeNpiYCAFaDvOB+L/YJquAGjpw6///4MtpxAwMQwQGLV41OJRixfImzmBaYahChihxV8CIZ8yXN2fiLUIJVcvrBjEh1GKSDQ2SXqRAAs03gi7Ggau7mdEi3Pi9Q49MFotjlpMAmChUVoIAJL9QKwAFXkAxIXArLiBdokLaCmfhe//3pU74IVI/dw1/0FiUAfRzOL7yJbCMEgMJEebONZ2FAAFb4iPO4YUVEwBqEZhoKpFYaDlwqRZDKplQGU11toGLP8BlJDWbNmJITVvxVoQ9RzKZWemeooWU3x44tzFCA52NgZDHS2wEMghHVNnM/z89asRmsK/MNIpO4F82gvEB2DZi5GmpQQkIQmjib4FRgmNLYZYDrKYHcr7CbT0LYgBEGAANUzSIEqdxeYAAAAASUVORK5CYII=") 12 12, crosshair',
      // crosshairsSquare: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK9JREFUeNpiYCAFaDvOB+L/YJquAGjpw6///4MtpxAwMQwQGLV41OJRixfImzmBaYahChihxV8CIZ8yXN2fiLUIJVcvrBjEh1GKSDQ2SXqRAAs03gi7Ggau7mdEi3Pi9Q49MFotjlpMAmChRTrAKw/Njiy08M3DU/uwikPLeQaaWUwgRKSA5GeWAYheyQGtFknzMaSWSRzNTvhSL+6GAG1TryQO2ee0TNWf8ckBBBgA6OV4hjhWgkEAAAAASUVORK5CYII=") 12 12, crosshair'
    };

    let defaultCursors = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out', 'grab', 'grabbing'];

    if (typeof customCursors[handler()] === "undefined" && defaultCursors.indexOf(handler()) === -1) {
      throw new Error(`Cursor "${handler()}" could not be found`)
    } else {
      instance._canvas.style.cursor = customCursors[handler()] || handler();
      if(silent === false) {
        instance._cursorHistory.push(handler);
      }
      instance._currentCursor = handler();
    }
  }
}
