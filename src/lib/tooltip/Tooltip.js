import "./../../../bower_components/tooltipster/css/tooltipster";
import "./TooltipStyle";

// todo: mute tooltips on demand
class TooltipNotifier {
  _el = {};

  constructor() {
    return this.Tooltip.bind(this);
  }

  Tooltip(element) {
    this._el = $(element).tooltipster();
    return this;
  }

  getDefaults(iconSign, type, message, timer) {
    var timer = timer || 4000;
    return {
      //<span class="time">${timer ? `(will close in ${timer/1000}s)` : "(won't close)"}</span>
      // multiple:    true,
      speed:       0,
      timer:       timer,
      trigger:     'custom',
      hideOnClick: true,
      arrowColor:  'rgb(255, 255, 255)',
      position:    'right',
      content:     $(this._getContent(type, iconSign, message))
    };
  }

  _getContent(type, iconSign, message) {
    return `<span> <i class="${type}">${iconSign}</i>${message}</span>`;
  }

  info(message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('i', 'info', message, timer), opt);
    $(this._el).tooltipster(opt).tooltipster('show');
    return this;
  }

  warning(message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('#', 'warning', message, timer), opt);
    $(this._el).tooltipster(opt).tooltipster('show');
    return this;
  }

  danger(message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('!', 'danger', message, timer), opt);
    $(this._el).tooltipster(opt).tooltipster('show');
    return this;
  }

  loading(message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('%', 'loading', message, timer), opt);
    $(this._el).tooltipster(opt).tooltipster('show');
    return this;
  }

  destroy() {
    $(this._el).tooltipster('destroy');
    return this;
  }

  show() {
    $(this.el).tooltipster('show');
    return this;
  }

  hide() {
    $(this.el).tooltipster('hide');
    return this;
  }

  get() {
    $(this._el).tooltipster();
    return this;
  }
}

export var Tooltip = new TooltipNotifier();