(function($) {
  /**
   * Toggle a specific attribute's value
   * @param attr
   * @param a
   * @param b
   * @returns {jQuery}
   */
  $.fn.toggleAttr = function(attr, a, b) {
    let attrValue = this.attr(attr);

    if(typeof a === 'undefined' || typeof b === 'undefined') {
      this.attr(attr, ! attrValue);
    } else {
      if(attrValue === a) {
        this.attr(attr, b)
      } else if (pair && attrValue === b) {
        this.attr(attr, a)
      }
    }

    return this;
  };

  /**
   * Check if the selector has matched an element
   * @returns {boolean}
   */
  $.fn.found = function() {
    return !! this.get(0);
  };

  /**
   * Remove and add a the class
   * @param className
   * @returns {*|DOMElement}
   */
  $.fn.reapplyClass = function(className) {
    return this.removeClass(className).addClass(className);
  };

  /**
   * Switch between classes based on the current class
   * @param a
   * @param b
   * @param stopDefaultBehaviour
   * @returns {jQuery}
   */
  $.fn.switchClass = function(a, b, stopDefaultBehaviour) {
      if(typeof a === 'undefined' && typeof b === 'undefined' && ! stopDefaultBehaviour) {
        a = 'disabled';
        b = '';
      }

      if(this.hasClass(a)) {
        this.removeClass(a).addClass(b);
      } else {
        this.removeClass(b).addClass(a);
      }

    return this;
  };

  /**
   * Check if the element has got an attribute
   * @param attr
   * @returns {boolean}
   */
  $.fn.hasAttr = function(attr) {
    let hasAttribute = false;

    this.get().forEach(function(el) {
      if(el.hasAttribute(attr)) hasAttribute = true;
    });

    return hasAttribute;
  };

  $.fn.disable = function() {
    this.reapplyClass('disabled');
    this.attr('disabled', true);
    return this;
  };

  $.fn.activate = function() {
    this.removeClass('disabled');
    this.attr('disabled', false);
    return this;
  };

  $.fn.isDisabled = function() {
    return this.hasClass('disabled') && !! this.attr('disabled');
  };

  $.fn.isActive = function() {
    return ! this.hasClass('disabled') && ! this.attr('disabled');
  };

  $.fn.toggleState = function() {
    if(this.isDisabled()) this.activate();
    else if(this.isActive()) this.disable();
    return this;
  };

  $.fn.getId = function() {
    return this.attr('id');
  };

  $.fn.findFocused = function() {
    return this.wrap('<div></div>').find(':focus');
  };

  /**
   * Get the current class of the element
   * @returns {*}
   */
  $.fn.getClass = function() {
    return this.attr('class');
  };

  $.fn.hasFocus = function () {
    return this.is(':focus');
  };

  /**
   * Set a class to the element
   * @param className
   * @returns {jQuery}
   */
  $.fn.setClass = function(className) {
    this.attr('class', className);
    return this;
  };

})(jQuery);