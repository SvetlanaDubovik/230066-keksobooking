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
   var infoStatusCloseHandler = function (evt, info) {    
    info.classList.add('hidden');
    document.removeEventListener('keydown', infoStatusCloseHandler);
    document.removeEventListener('click', infoStatusCloseHandler);
  };

  var infoStatusActions = function () {
  var infoStatus = document.querySelector('.infoStatus');

  infoStatus.addEventListener('click', function (evt) {
    infoStatusCloseHandler(evt, this);
  });
  infoStatus.addEventListener('keydown', function (evt) {
    if (window.card.isEnterKey(evt)) {
      infoStatusCloseHandler(evt, this);
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (window.card.isEscKey(evt)) {
      infoStatusCloseHandler(evt, this);
    }
  });
  };

  window.backend = {  
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + 'data');
      xhr.send();
    },
    save: function (data, onLoad, onError ) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
    window.backend.generateInfoStatus(errorMessage);
    },
    generateInfoStatus: function (errorMessage) {
      var node = document.createElement('div');
      var closer = document.createElement('a');
      var image = document.createElement('img');
      closer.classList.add('dialog__close');
      closer.href = '#';
      closer.style.position = 'absolute';
      closer.style.right = 0;
      closer.style.top = '-40px';
      image.setAttribute('src', './img/close.svg');
      image.width = 22;
      image.height = 22;
      image.setAttribute('alt', '');  
      node.classList.add('infoStatus');
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
      closer.appendChild(image);
      node.appendChild(closer);
      document.body.appendChild(node);
      infoStatusActions();
    }
  };

})();
