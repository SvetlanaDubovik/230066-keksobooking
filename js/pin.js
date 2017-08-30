'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var adObjects = window.data.adObjs;

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
    if (evt.keyCode === window.card.ENTER_KEYCODE || evt.type === 'click') {
      window.pin.deleteActiveClass();
      var target = evt.target;
      while (target !== tokyoPinMap) {
        if (target.className === 'pin') {
          target.classList.add('pin--active');
          var source = target.firstElementChild.getAttribute('src');
          var num = getAdObjectsNumber(source);
          if (num !== -1) {
            window.card.openAd(num);
          }
        }
        target = target.parentNode;
      }
      document.addEventListener('keydown', window.card.dialogCloseHandler);
    }
  };

  tokyoPinMap.addEventListener('click', function (evt) {
    pinClickHandler(evt);
  });

  tokyoPinMap.addEventListener('keydown', function (evt) {
    pinClickHandler(evt);
  });

})();
