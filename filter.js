'use strict';
(function () {
  var features = document.querySelectorAll('.feature');
  var filters = document.querySelectorAll('.tokyo__filter');
  
  filters.forEach( function (it) {
    it.addEventListener('change', filterHandler);
  });
  
  
  
  
})();
