'use strict';
(function () {
  var MIN_PRICES = [0, 1000, 5000, 10000];

  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  var doSameSelectValue = function (select1, select2) {
    var selectOption = select1.options.selectedIndex;
    select2.options.selectedIndex = selectOption;
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, doSameSelectValue);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, doSameSelectValue);
  });

  var roomNumber = noticeForm.querySelector('#room_number');
  var roomNumberOptions = roomNumber.options;
  var capacity = noticeForm.querySelector('#capacity');
  var capacityOptions = capacity.options;
  var capacityOptionsLength = capacityOptions.length;

  var removeDisabledAttribute = function () {
    for (var i = 0; i < capacityOptionsLength; i++) {
      capacityOptions[i].removeAttribute('disabled');
    }
  };

  var isCorrespondRoomToCapacity = function (room, guests) {
    var length = guests.length;
    switch (room.selectedIndex) {
      // 1 комната
      case 0:
        removeDisabledAttribute();
        for (var i = 0; i < length; i++) {
          if (guests[i].value !== '1') {
            guests[i].setAttribute('disabled', 'disabled');
          }
        }
        guests.selectedIndex = 2;
        break;
      // 2 комнаты
      case 1:
        removeDisabledAttribute();
        for (i = 0; i < length; i++) {
          if (guests[i].value > 2 || guests[i].value === '0') {
            guests[i].setAttribute('disabled', 'disabled');
          }
        }
        guests.selectedIndex = 1;
        break;
      // 3 комнаты
      case 2:
        removeDisabledAttribute();
        guests[3].setAttribute('disabled', 'disabled');
        guests.selectedIndex = 0;
        break;
      // 100 комнат
      case 3:
        removeDisabledAttribute();
        for (i = 0; i < length; i++) {
          if (guests[i].value !== '0') {
            guests[i].setAttribute('disabled', 'disabled');
          }
        }
        guests.selectedIndex = 3;
        break;
    }
  };

  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumberOptions, capacityOptions, isCorrespondRoomToCapacity);
  });

  window.addEventListener('load', function () {
    window.synchronizeFields(roomNumberOptions, capacityOptions, isCorrespondRoomToCapacity);
  });

  var houseType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  var checkMinPrice = function (val) {
    price.value = val;
  };

  var isCorrespondTypeToPrice = function (house, cost) {
    switch (house.selectedIndex) {
      case 0:
        cost.setAttribute('min', MIN_PRICES[1]);
        checkMinPrice(MIN_PRICES[1]);
        break;
      case 1:
        cost.setAttribute('min', MIN_PRICES[0]);
        checkMinPrice(MIN_PRICES[0]);
        break;
      case 2:
        cost.setAttribute('min', MIN_PRICES[2]);
        checkMinPrice(MIN_PRICES[2]);
        break;
      case 3:
        cost.setAttribute('min', MIN_PRICES[3]);
        checkMinPrice(MIN_PRICES[3]);
        break;
    }
  };

  houseType.addEventListener('change', function () {
    window.synchronizeFields(houseType, price, isCorrespondTypeToPrice);
  });

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
      window.backend.generateInfoStatus('Данные переданы успешно');
      window.synchronizeFields(houseType, price, isCorrespondTypeToPrice);
      window.synchronizeFields(roomNumberOptions, capacityOptions, isCorrespondRoomToCapacity);
    }, window.backend.errorHandler);
  });

})();
