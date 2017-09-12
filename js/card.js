'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  offerDialog.classList.add('hidden');

  window.card = {
    dialogEscCloseHandler: function (evt) {
      if (window.util.isEscKey(evt)) {
        window.card.dialogCloseHandler();
      }
    },
    dialogCloseHandler: function () {
      offerDialog.classList.add('hidden');
      window.pin.deleteActiveClass();
      document.removeEventListener('keydown', window.card.dialogEscCloseHandler);
    }
  };

  offerDialog.addEventListener('click', window.card.dialogCloseHandler);
  offerDialog.addEventListener('keydown', function (evt) {
    if (window.util.isEnterKey(evt)) {
      window.card.dialogCloseHandler();
    }
  });

})();
