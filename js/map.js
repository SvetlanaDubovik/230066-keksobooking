'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  window.map = {
    adObjs: null,
    showMarkers: function (arrObj) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arrObj.length; i++) {
        fragment.appendChild(window.pin.generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar, arrObj[i].id));
      }
      tokyoPinMap.appendChild(fragment);
    }
  };

  var successHandler = function (data) {
    window.map.adObjs = data;
    window.map.adObjs.forEach(function (it, i) {
      it.id = i;
    });
    var randomDataArr = window.util.getRandomArray(data, 3);

    window.map.showMarkers(randomDataArr);
    window.filter();
  };

  window.backend.load(successHandler, window.backend.errorHandler);
})();
