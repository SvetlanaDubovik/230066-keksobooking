'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var adObjects = window.data.adObjs;

  //  вывод объектов на карту
  var showMarkers = function (arrObj) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrObj.length; i++) {
      fragment.appendChild(window.pin.generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar));
    }
    tokyoPinMap.appendChild(fragment);
  };

  showMarkers(adObjects);
})();
