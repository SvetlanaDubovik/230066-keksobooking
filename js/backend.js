'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking/';
  var BORDER_SUCCESS = '#35f277';
  var BACKGROUND_SUCCESS = '#d3ffe2';
  var BORDER_ERROR = 'red';
  var BACKGROUND_ERROR = '#fff3e8';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else if (xhr.status === 400) {
        onError('Неверный запрос');
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
  var infoStatusCloseHandler = function (info) {
    info.classList.add('hidden');
    document.removeEventListener('keydown', infoStatusCloseHandler);
    document.removeEventListener('click', infoStatusCloseHandler);
  };

  var infoStatusActions = function () {
    var infoStatus = document.querySelector('.infoStatus');

    infoStatus.addEventListener('click', function () {
      infoStatusCloseHandler(infoStatus);
    });
    infoStatus.addEventListener('keydown', function (evt) {
      if (window.util.isEnterKey(evt)) {
        infoStatusCloseHandler(infoStatus);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscKey(evt)) {
        infoStatusCloseHandler(infoStatus);
      }
    });
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
      window.backend.generateInfoStatus(errorMessage);
    },
    generateInfoStatus: function (errorMessage) {
      var node = null;
      node = document.querySelector('.infoStatus');
      if (!node) {
        node = document.createElement('div');
        var closer = document.createElement('a');
        var image = document.createElement('img');
        var spanTextError = document.createElement('div');
        spanTextError.classList.add('textError');
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
        spanTextError.textContent = errorMessage;
        closer.appendChild(image);
        node.appendChild(closer);
        node.appendChild(spanTextError);
        document.body.appendChild(node);
      } else {
        node.classList.remove('hidden');
        spanTextError = document.querySelector('.textError');
        spanTextError.textContent = errorMessage;
      }
      if (errorMessage === 'Данные переданы успешно') {
        node.style.backgroundColor = BACKGROUND_SUCCESS;
        node.style.borderColor = BORDER_SUCCESS;
      } else {
        node.style.backgroundColor = BACKGROUND_ERROR;
        node.style.borderColor = BORDER_ERROR;
      }
      infoStatusActions();
    }
  };

})();
