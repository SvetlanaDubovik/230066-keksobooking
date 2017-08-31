'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var adObjects = window.data.adObjs;
  var address = document.querySelector('#address');

  window.pin = {
    generateMarkerLayout: function (x, y, avatar) {
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
    for (var i = 0; i < adObjects.length; i++) {
      if (str === adObjects[i].author.avatar) {
        return i;
      }
    }
    return -1;
  };

  var pinClickHandler = function (evt) {
    if (window.card.isEnterKey(evt) === true || evt.type === 'click') { 
      var target = evt.target;
      while (target !== tokyoPinMap) {
        if (target.className === 'pin') {
          window.pin.deleteActiveClass();
          target.classList.add('pin--active');
          var source = target.firstElementChild.getAttribute('src');
          var num = getAdObjectsNumber(source);
          if (num !== -1) {
            window.card.openDialog(num);
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
  var pinImg = pinMain.querySelector('img');

  var showAddress = function (x, y) {
    var xCoord = +x + pinMain.offsetWidth / 2;
    var yCoord = +y + pinMain.offsetHeight;

    address.value = 'x: ' + xCoord + 'px, y:' + yCoord + 'px';
  };

  showAddress(pinMain.offsetLeft, pinMain.offsetTop);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainX = (pinMain.offsetTop - shift.y);
      var pinMainY = (pinMain.offsetLeft - shift.x);

      pinMain.style.top = pinMainX + 'px';
      pinMain.style.left = pinMainY + 'px';

      showAddress(pinMainX, pinMainY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

 });

})();