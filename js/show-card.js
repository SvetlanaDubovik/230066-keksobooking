'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  window.showCard = function (obj) {
    var template = document.querySelector('#lodge-template');
    var element = template.content.querySelector('.dialog__panel').cloneNode(true);
    element.querySelector('.lodge__title').textContent = obj.offer.title;
    element.querySelector('.lodge__address').textContent = obj.offer.address;
    element.querySelector('.lodge__price').textContent = obj.offer.price + ' \u20bd/ночь';
    element.querySelector('.lodge__type').textContent = obj.offer.type;
    element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + obj.offer.guests + ' гостей в ' + obj.offer.rooms + ' комнатах';
    element.querySelector('.lodge__checkin-time').textContent = 'Заезд после  ' + obj.offer.checkin + ', выезд до  ' + obj.offer.checkout;

    var span = null;
    var length = obj.offer.features.length;
    for (var i = 0; i < length; i++) {
      span = '';
      span = document.createElement('span');
      span.className = 'feature__image feature__image--' + obj.offer.features[i];
      element.querySelector('.lodge__features').appendChild(span);
    }
    element.querySelector('.lodge__description').textContent = obj.offer.description;
    offerDialog.classList.remove('hidden');

    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    offerDialog.replaceChild(element, dialogPanel);

    var dialogTitle = offerDialog.querySelector('.dialog__title');
    dialogTitle.children[0].setAttribute('src', obj.author.avatar);
  };

})();
