'use strict';
(function () {
  var LOW_VALUE = 10000;
  var HIGH_VALUE = 50000;
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var features = tokyoFilters.querySelectorAll('.feature');
  var filters = tokyoFilters.querySelectorAll('.tokyo__filter');

  var updateMarkers = function (arrObjs) {
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var pins = tokyoPinMap.querySelectorAll('.pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('pin__main')) {
        it.parentNode.removeChild(it);
      }
    });
    window.card.dialogCloseHandler();
    window.map.showMarkers(arrObjs);
  };

  var setFilteredField = function (field, val) {
    switch (field) {
      case 'housing_type':
        field = 'housingType';
        break;
      case 'housing_price':
        field = 'housingPrice';
        break;
      case 'housing_room-number':
        field = 'housingRoomNumber';
        break;
      case 'housing_guests-number':
        field = 'housingGuestsNumber';
        break;
    }

    if (val === 'any') {
      filteredField[field] = null;
    } else {
      filteredField[field] = val;
    }
  };

  var filterHousingType = function (obj, val) {
    var res = obj.filter(function (it) {
      return it.offer.type === val;
    });
    return res;
  };

  var filterPrice = function (obj, min, max) {
    var res = obj.filter(function (it) {
      return it.offer.price >= min && it.offer.price <= max;
    });
    return res;
  };

  var filterRooms = function (obj, val) {
    var value = +val;
    var res = obj.filter(function (it) {
      return it.offer.rooms === value;
    });
    return res;
  };

  var filterGuests = function (obj, val) {
    var value = +val;
    var res = obj.filter(function (it) {
      return it.offer.guests === value;
    });
    return res;
  };

  var filterFeatures = function (obj, arr) {
    arr.forEach(function (item) {
      obj = obj.filter(function (it) {
        return it.offer.features.indexOf(item) !== -1;
      });
    });
    return obj;
  };

  var filteredField = {
    'housingType': null,
    'housingPrice': null,
    'housingRoomNumber': null,
    'housingGuestsNumber': null
  };

  var filterHandler = function (evt) {
    var copyAdObjs = window.map.adObjs;
    var target = evt.currentTarget;
    var value = target.value;
    var featuresChoosen = [];

    featuresChoosen = [].filter.call(features, function (it) {
      return it.childNodes[1].checked === true;
    }).map(function (it) {
      return it.childNodes[1].value;
    });

    if (target.className !== 'feature') {
      setFilteredField(target.id, value);
    }

    if (filteredField['housingType'] !== null) {
      copyAdObjs = filterHousingType(copyAdObjs, filteredField['housingType']);
    }

    if (filteredField['housingPrice'] !== null) {
      if (filteredField['housingPrice'] === 'low') {
        copyAdObjs = filterPrice(copyAdObjs, 0, LOW_VALUE);

      } else if (filteredField['housingPrice'] === 'middle') {
        copyAdObjs = filterPrice(copyAdObjs, LOW_VALUE, HIGH_VALUE);

      } else if (filteredField['housingPrice'] === 'high') {
        copyAdObjs = filterPrice(copyAdObjs, HIGH_VALUE, Infinity);

      }
    }

    if (filteredField['housingRoomNumber'] !== null) {
      copyAdObjs = filterRooms(copyAdObjs, filteredField['housingRoomNumber']);
    }

    if (filteredField['housingGuestsNumber'] !== null) {
      copyAdObjs = filterGuests(copyAdObjs, filteredField['housingGuestsNumber']);
    }

    if (featuresChoosen) {
      copyAdObjs = filterFeatures(copyAdObjs, featuresChoosen);
    }

    window.util.debounce(function () {
      updateMarkers(copyAdObjs);
    });
  };

  window.filter = function () {
    filters.forEach(function (it) {
      it.addEventListener('change', filterHandler);
    });
    features.forEach(function (it) {
      it.addEventListener('change', filterHandler);
    });
  };

})();
