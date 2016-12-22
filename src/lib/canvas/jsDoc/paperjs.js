/**
 * @typedef {Object} PaperEvent
 *
 * @property  {number}  timeStamp         readonly    The time at which the event was created, in milliseconds since the epoch.
 * @property  {object}  modifiers         readonly    The current state of the keyboard modifiers.  <br> See also: Key.modifiers
 * @property  {function} preventDefault               Cancels the event if it is cancelable, without stopping further propagation of the event.
 * @property  {function} stopPropagation              Prevents further propagation of the current event.
 * @property  {function} stop                         Cancels the event if it is cancelable, and stops stopping further propagation of the event. This is has the same effect as calling both stopPropagation() and preventDefault().<br> Any handler can also return false to indicate that stop() should be called right after.
 */

/**
 * @callback ToolEventHandler
 * @param {ToolEvent} event
 */

/**
 * @typedef {Object}  ToolEvent
 * @property {string} type The type of tool event: 'mousedown', 'mouseup', 'mousemove', 'mousedrag'
 */

/**
 * @callback KeyEventHandler
 * @param {KeyEvent}  event
 */

/**
 * @typedef {Object}  KeyEvent
 * @extends PaperEvent
 * @property  {string}  type        The type of tool event: 'keydown', 'keyup'
 * @property  {string}  character   The character representation of the key that caused this key event, taking into account the current key-modifiers (e.g. shift, control, caps-lock, etc.)
 * @property  {string}  key         The key that caused this key event, either as a lower-case character or special key descriptor:<br> 'enter', 'space', 'shift', 'control', 'alt', 'meta', 'caps-lock', 'left', 'up', 'right', 'down', 'escape', 'delete', ...
 * @method    {string}  toString    a string representation of the key event
 */

/**
 * @typedef {Object}  ToolOptions
 * @property {number}           [minDistance] minimum distance the mouse has to drag before firing the onMouseDrag event, since the last onMouseDrag event.
 * @property {number}           [maxDistance] maximum distance the mouse has to drag before firing the onMouseDrag event, since the last onMouseDrag event.
 * @property {number}           [fixedDistance]
 * @property {ToolEventHandler} [onMouseDown] The function to be called when the mouse button is pushed down. The function receives a ToolEvent object which contains information about the tool event.
 * @property {ToolEventHandler} [onMouseDrag] The function to be called when the mouse position changes while the mouse is being dragged. The function receives a ToolEvent object which contains information about the tool event.
 * @property {ToolEventHandler} [onMouseMove] The function to be called the mouse moves within the project view. The function receives a ToolEvent object which contains information about the tool event.
 * @property {ToolEventHandler} [onMouseUp] The function to be called when the mouse button is released. The function receives a ToolEvent object which contains information about the tool event.
 * @property {KeyEventHandler}  [onKeyDown]
 * @property {KeyEventHandler}  [onKeyUp]
 */
true;