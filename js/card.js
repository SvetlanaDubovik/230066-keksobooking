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
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },
    dialogEscCloseHandler: function (evt) {
      if (window.card.isEscKey(evt)) {
        dialogCloseHandler();
      }
    },
    openDialog: function (k) {
      var template = document.querySelector('#lodge-template');
      var element = template.content.querySelector('.dialog__panel').cloneNode(true);
      element.querySelector('.lodge__title').textContent = adObjects[k].offer.title;
      element.querySelector('.lodge__address').textContent = adObjects[k].offer.address;
      element.querySelector('.lodge__price').textContent = adObjects[k].offer.price + ' \u20bd/ночь';
      element.querySelector('.lodge__type').textContent = adObjects[k].offer.type;
      element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + adObjects[k].offer.guests + ' гостей в ' + adObjects[k].offer.rooms + ' комнатах';
      element.querySelector('.lodge__checkin-time').textContent = 'Заезд после  ' + adObjects[k].offer.checkin + ', выезд до  ' + adObjects[k].offer.checkout;

      var span = null;
      var length = adObjects[k].offer.features.length;
      for (var i = 0; i < length; i++) {
        span = '';
        span = document.createElement('span');
        span.className = 'feature__image feature__image--' + adObjects[k].offer.features[i];
        element.querySelector('.lodge__features').appendChild(span);
      }
      element.querySelector('.lodge__description').textContent = adObjects[k].offer.description;
      offerDialog.classList.remove('hidden');

      var dialogPanel = offerDialog.querySelector('.dialog__panel');
      offerDialog.replaceChild(element, dialogPanel);

      var dialogTitle = offerDialog.querySelector('.dialog__title');
      dialogTitle.children[0].setAttribute('src', adObjects[k].author.avatar);
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
