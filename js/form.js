'use strict';
(function () {
  var MIN_PRICE = [0, 1000, 5000, 10000];

  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  var doSameSelectValue = function (select1, select2) {
    var selectOption = select1.options.selectedIndex;
    select2.options.selectedIndex = selectOption;
  };

  timeIn.addEventListener('change', function () {
    doSameSelectValue(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    doSameSelectValue(timeOut, timeIn);
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

  var isCorrespondRoomToCapacity = function () {
    switch (roomNumberOptions.selectedIndex) {
      // 1 комната
      case 0:
        removeDisabledAttribute();
        for (var i = 0; i < capacityOptionsLength; i++) {
          if (capacityOptions[i].value !== '1') {
            capacityOptions[i].setAttribute('disabled', 'disabled');
          }
        }
        capacityOptions.selectedIndex = 2;
        break;
      // 2 комнаты
      case 1:
        removeDisabledAttribute();
        for (i = 0; i < capacityOptionsLength; i++) {
          if (capacityOptions[i].value > 2 || capacityOptions[i].value === '0') {
            capacityOptions[i].setAttribute('disabled', 'disabled');
          }
        }
        capacityOptions.selectedIndex = 1;
        break;
      // 3 комнаты
      case 2:
        removeDisabledAttribute();
        capacityOptions[3].setAttribute('disabled', 'disabled');
        capacityOptions.selectedIndex = 0;
        break;
      // 100 комнат
      case 3:
        removeDisabledAttribute();
        for (i = 0; i < capacityOptionsLength; i++) {
          if (capacityOptions[i].value !== '0') {
            capacityOptions[i].setAttribute('disabled', 'disabled');
          }
        }
        capacityOptions.selectedIndex = 3;
        break;
    }
  };

  roomNumber.addEventListener('change', function () {
    isCorrespondRoomToCapacity();
  });

  window.addEventListener('load', function () {
    isCorrespondRoomToCapacity();
  });

  var houseType = noticeForm.querySelector('#type');
  var houseTypeOptions = houseType.options;
  var price = noticeForm.querySelector('#price');

  var checkMinPrice = function (val) {
    price.value = val;
  };

  var isCorrespondTypeToPrice = function () {
    switch (houseTypeOptions.selectedIndex) {
      case 0:
        price.setAttribute('min', MIN_PRICE[1]);
        checkMinPrice(MIN_PRICE[1]);
        break;
      case 1:
        price.setAttribute('min', MIN_PRICE[0]);
        checkMinPrice(MIN_PRICE[0]);
        break;
      case 2:
        price.setAttribute('min', MIN_PRICE[2]);
        checkMinPrice(MIN_PRICE[2]);
        break;
      case 3:
        price.setAttribute('min', MIN_PRICE[3]);
        checkMinPrice(MIN_PRICE[3]);
        break;
    }
  };

  houseType.addEventListener('change', function () {
    isCorrespondTypeToPrice();
  });

})();
