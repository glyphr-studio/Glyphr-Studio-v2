import "script!./../../../bower_components/jquery/dist/jquery";
import "./../../../bower_components/tooltipster/css/tooltipster";
import "./TooltipStyle";
import "script!./../../../bower_components/tooltipster/js/jquery.tooltipster";

// todo: mute tooltips on demand
class TooltipNotifier {
  constructor() {
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

  info(el, message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('i', 'info', message, timer), opt);
    return $(el).tooltipster(opt).tooltipster('show');
  }

  warning(el, message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('#', 'warning', message, timer), opt);
    return $(el).tooltipster(opt).tooltipster('show');
  }

  danger(el, message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('!', 'danger', message, timer), opt);
    return $(el).tooltipster(opt).tooltipster('show');
  }

  loading(el, message, timer, opt) {
    var opt = Object.assign({}, this.getDefaults('%', 'loading', message, timer), opt);
    return $(el).tooltipster(opt).tooltipster('show');
  }

  get(el) {
    return $(el).tooltipster();
  }
}

export var tooltip = new TooltipNotifier();