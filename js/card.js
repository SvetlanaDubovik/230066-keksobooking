'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var adObjects = window.data.adObjs;
  var offerDialog = document.querySelector('#offer-dialog');
  offerDialog.classList.add('hidden');

  window.card = {
    isEscKey: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEYCODE;
    },
    isEnterKey: function(evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEYCODE;
    },
    dialogEscCloseHandler: function (evt) {
      if (window.card.isEscKey(evt)) {
        dialogCloseHandler();
      }
    }
  };

  var dialogCloseHandler = function () {
    offerDialog.classList.add('hidden');
    window.pin.deleteActiveClass();
    document.removeEventListener('keydown', window.card.dialogEscCloseHandler);
  };

  offerDialog.addEventListener('click', dialogCloseHandler);
  offerDialog.addEventListener('keydown', function (evt) {
    if (window.card.isEnterKey(evt)) {
      dialogCloseHandler();
    }
  });

})();
