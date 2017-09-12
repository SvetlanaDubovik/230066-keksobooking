'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  window.util = {
    isEscKey: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEYCODE;
    },
    isEnterKey: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEYCODE;
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    },
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArray: function (arr, k) {
      var res = [];
      while (res.length < k) {
        var random = window.util.getRandomValue(0, arr.length - 1);
        if (res.indexOf(arr[random]) === -1) {
          res.push(arr[random]);
        }
      }
      return res;
    }
  };
})();
