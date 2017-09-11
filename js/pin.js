'use strict';
(function () { 
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var address = document.querySelector('#address');

  window.pin = {
    generateMarkerLayout: function (x, y, avatar, k) {
      var widthHeight = 40;
      var divBlock = document.createElement('div');
      var pic = document.createElement('img');
      pic.src = '' + avatar;
      pic.className = 'rounded';
      pic.width = widthHeight;
      pic.height = widthHeight;
      pic.setAttribute('alt', '');
      divBlock.className = 'pin';
      divBlock.setAttribute('tabIndex', 0);
      divBlock.style.left = x - pic.width / 2 + 'px';
      divBlock.style.top = y - pic.height + 'px';
      divBlock.id = 'id' + k;
      divBlock.appendChild(pic);
      return divBlock;
    },
    deleteActiveClass: function () {
      var pinActive = tokyoPinMap.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
      }
    }
  };

  var getAdObjectsNumber = function (str) {
    var idValue = parseInt(str.slice(2), 10);
    for (var i = 0; i < window.map.adObjs.length; i++) {
      if (idValue === i) {
        return i;
      }
    }
    return -1;
  };

  var pinClickHandler = function (evt) {
    if (window.card.isEnterKey(evt) || evt.type === 'click') {
      var target = evt.target;
      while (target !== tokyoPinMap) {
        if (target.className === 'pin') {
          window.pin.deleteActiveClass();
          target.classList.add('pin--active');
          var id = target.getAttribute('id');
          var num = getAdObjectsNumber(id);
          if (num !== -1) {
            window.showCard(window.map.adObjs[num]);
          }
        }
        target = target.parentNode;
      }
      document.addEventListener('keydown', window.card.dialogEscCloseHandler);
    }
  };

  tokyoPinMap.addEventListener('click', function (evt) {
    pinClickHandler(evt);
  });

  tokyoPinMap.addEventListener('keydown', function (evt) {
    pinClickHandler(evt);
  });

  var pinMain = tokyoPinMap.querySelector('.pin__main ');
  pinMain.style.position = 'absolute';
  pinMain.style.zIndex = 1000;

  var showAddress = function (x, y) {
    var xCoord = +x + pinMain.offsetWidth / 2;
    var yCoord = +y + pinMain.offsetHeight;

    address.value = 'x: ' + xCoord + ', y:' + yCoord;
  };

  var limits = {
    top: 160,
    right: 1135,
    bottom: 560,
    left: 320
  };

  showAddress(pinMain.offsetLeft, pinMain.offsetTop);

  var startCoords = {
    x: null,
    y: null
  };

  var onMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var pinMainX = (pinMain.offsetLeft - shift.x);
    var pinMainY = (pinMain.offsetTop - shift.y);

    if (pinMainX > limits.right) {
      pinMainX = limits.right;
    } else if (pinMainX < limits.left) {
      pinMainX = limits.left;
    }

    if (pinMainY > limits.bottom) {
      pinMainY = limits.bottom;
    } else if (pinMainY < limits.top) {
      pinMainY = limits.top;
    }

    pinMain.style.left = pinMainX + 'px';
    pinMain.style.top = pinMainY + 'px';

    showAddress(pinMainX, pinMainY);
  };

  var onMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMoveHandler);
    document.removeEventListener('mouseup', onMouseUpHandler);
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    onMouseMoveHandler(evt);
    onMouseUpHandler(evt);

    document.addEventListener('mousemove', onMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUpHandler);

  });
  
  var features = document.querySelectorAll('.feature');
  var filters = document.querySelectorAll('.tokyo__filter');

  var updateMarkers = function (arrObjs) {
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var pins = tokyoPinMap.querySelectorAll('.pin');
    pins.forEach(function (it) {
      if (!it.classList.contains('pin__main'))
        it.parentNode.removeChild(it);
      });
    window.map.showMarkers(arrObjs);
  };

  var checkSelect = function () {
    var pins = tokyoPinMap.querySelectorAll('.pin');
    var value = this.children[this.selectedIndex].value;
    var filteredValues = null;
    switch(this.id) {
      case 'housing_type':
        filteredValues = window.map.adObjs.filter(function (it) {
          return it.offer.type === value;
        });
        break;
      case 'housing_price':
        var lowValue = 10000;
        var highValue = 50000;
        if (value === 'low') {
          filteredValues = window.map.adObjs.filter(function (it) {
            return it.offer.price >= 0 && it.offer.price <= lowValue;
        });
        } else if (value === 'middle') {
          filteredValues = window.map.adObjs.filter(function (it) {
            return it.offer.price >= lowValue && it.offer.price <= highValue;
        });
        } else if (value === 'high') {
          filteredValues = window.map.adObjs.filter(function (it) {
            return it.offer.price >= highValue;
        });
        }
        break;
      case 'housing_room-number':
        var val = parseInt(value, 10);
        filteredValues = window.map.adObjs.filter(function (it) {
          return it.offer.rooms === val;
        });
        break;
      case 'housing_guests-number':
        filteredValues = window.map.adObjs.filter(function (it) {
          return it.offer.guests === +value;
        });
        break;
    }
    updateMarkers(filteredValues);
  };

  filters.forEach( function (it) {
    it.addEventListener('change', checkSelect);
  });

})();
