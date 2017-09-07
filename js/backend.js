'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking/';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Извините, произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Извините, запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  var generateInfoStatus = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';   
    node.style.borderRadius = '10px';
    node.style.position = 'absolute';
    node.style.left = '40%';
    node.style.top = '5%';
    node.style.width = '300px';
    node.style.top = '100px';
    node.style.fontSize = '30px';
    node.style.borderWidth = '5px';
    node.style.borderStyle = 'solid';
    if(errorMessage === 'Данные переданы успешно') {
      node.style.backgroundColor = '#d3ffe2';
      node.style.borderColor = '#35f277';
    } else {
      node.style.backgroundColor = '#fff3e8';
      node.style.borderColor = 'red';
    }
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + 'data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
    generateInfoStatus(errorMessage);
  }
  };
})();