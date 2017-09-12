'use strict';
(function () {
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var features = tokyoFilters.querySelectorAll('.feature');
  var filters = tokyoFilters.querySelectorAll('.tokyo__filter');
  
  var updateMarkers = function (arrObjs) {
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var pins = tokyoPinMap.querySelectorAll('.pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('pin__main'))
        it.parentNode.removeChild(it);
      });
    window.card.dialogCloseHandler();
    window.map.showMarkers(arrObjs);
  };
  
  var setFilteredField = function (field, val) {
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
  
    var filterPrice = function(obj, min, max) {
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
    arr.forEach(function (item, i) {
      obj = obj.filter(function (it) {
        return it.offer.features.indexOf(item) !== -1;
      });
    });
    return obj;
    
     };
  
  var filteredField = {
    'housing_type': null,
    'housing_price': null,
    'housing_room-number': null,
    'housing_guests-number': null,
    'housing_features': null
  }; 
  
  var filterHandler = function (evt) {
    var copyAdObjs = window.map.adObjs;
    var target = evt.currentTarget;
    var value = target.value;
    var featuresChoosen = [];
    
    featuresChoosen = [].filter.call(features, function(it) {
      return it.childNodes[1].checked === true
    }).map (function (it) {
      return it.childNodes[1].value;
    }); 
    
    if (target.className !== 'feature') {
    setFilteredField(target.id, value);
    }
        
    if (filteredField['housing_type'] !== null) {
      copyAdObjs = filterHousingType(copyAdObjs, filteredField['housing_type']);
    }
            
    if (filteredField['housing_price'] !== null) {
      var lowValue = 10000;
      var highValue = 50000;
      if (filteredField['housing_price'] === 'low') {
        copyAdObjs = filterPrice(copyAdObjs, 0, lowValue);

      } else if (filteredField['housing_price'] === 'middle') {
        copyAdObjs = filterPrice(copyAdObjs, lowValue, highValue);

      } else if (filteredField['housing_price'] === 'high') {
        copyAdObjs = filterPrice(copyAdObjs, highValue, Infinity);

      }
    }

    if (filteredField['housing_room-number'] !== null) {
      copyAdObjs = filterRooms(copyAdObjs, filteredField['housing_room-number']);
    }

    if (filteredField['housing_guests-number'] !== null) {
      copyAdObjs = filterGuests(copyAdObjs, filteredField['housing_guests-number']);
    }
    
    if (featuresChoosen) {
      
        copyAdObjs = filterFeatures(copyAdObjs, featuresChoosen);

    }
    window.util.debounce(function () {
      updateMarkers(copyAdObjs);
    });
  };
  
  window.filter ={
    filterArray: function (data) {   
      
      filters.forEach(function (it) {
        it.addEventListener('change', filterHandler);
      });
        features.forEach(function (it) {
        it.addEventListener('change', filterHandler);
      });       
    }
  };
   
})();
