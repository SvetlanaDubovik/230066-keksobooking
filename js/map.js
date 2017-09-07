'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  //  вывод объектов на карту
  var showMarkers = function (arrObj) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrObj.length; i++) {
      fragment.appendChild(window.pin.generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar));
    }
    tokyoPinMap.appendChild(fragment);
  };

  window.map = {
    adObjs: null
  };

  var successHandler = function (data) {
    window.map.adObjs = data;
    showMarkers(data);
  };

  window.backend.load(successHandler, window.backend.errorHandler);
})();
