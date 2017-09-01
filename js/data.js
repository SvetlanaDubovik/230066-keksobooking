'use strict';
(function () {
  var TITLE_VALUES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE_VALUES = ['flat', 'house', 'bungalo'];
  var TYPE_VALUES_OBJ = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var CHEK_IN_OUT_VALUES = ['12.00', '13.00', '14.00'];
  var FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AVATAR_ADDRESS = [1, 2, 3, 4, 5, 6, 7, 8];
  var DIALOG_COUNT = 8;

  var generateRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var generateRandomValue = function (value) {
    var number = generateRandomNumber(0, value.length - 1);
    return value[number];
  };

  //  перемешивание массива по алгоритму Фишера-Йетса
  var mixArray = function (arr, isLength) {
    var length = isLength === true ? arr.length : generateRandomNumber(0, arr.length);
    for (var i = length - 1; i > 0; i--) {
      var random = Math.floor(Math.random() * i);
      var choosen = arr[i];
      arr[i] = arr[random];
      arr[random] = choosen;
    }
    return arr.slice(0, length);
  };

  var titleValuesMix = mixArray(TITLE_VALUES, true);
  var avatarAddressMix = mixArray(AVATAR_ADDRESS, true);

  var generateLocations = function (k) {
    var loc = [];
    var xy = '';
    while (loc.length < k) {
      xy = generateRandomNumber(320, 920) + '+' +
      generateRandomNumber(160, 560);
      if (loc.indexOf(xy) === -1) {
        loc.push(xy);
      }
    }
    return loc;
  };

  var separateCoordinate = function (str) {
    var coordinates = str.split('+');
    var obj = {
      x: coordinates[0],
      y: coordinates[1]
    };
    return obj;
  };

  var locations = generateLocations(DIALOG_COUNT);

  //  создание объектов
  var initialAdObject = function (k) {
    var obj = {
      'author': {
        'avatar': 'img/avatars/user0' + avatarAddressMix[k] + '.png'
      },
      'offer': {
        'title': titleValuesMix[k],
        'address': separateCoordinate(locations[k]).x + ', ' + separateCoordinate(locations[k]).y,
        'price': generateRandomNumber(1000, 1000000),
        'type': (function () {
          var key = generateRandomValue(TYPE_VALUES);
          return TYPE_VALUES_OBJ[key];
        })(),
        'rooms': generateRandomNumber(1, 5),
        'guests': generateRandomNumber(1, 10),
        'checkin': CHEK_IN_OUT_VALUES[generateRandomNumber(0, 2)],
        'checkout': CHEK_IN_OUT_VALUES[generateRandomNumber(0, 2)],
        'features': mixArray(FEATURES_VALUES, false),
        'description': '',
        'photos': []
      },
      'location': {
        'x': separateCoordinate(locations[k]).x,
        'y': separateCoordinate(locations[k]).y
      }
    };
    return obj;
  };

  var generateAdObjects = function (k) {
    var arr = [];
    for (var i = 0; i < k; i++) {
      arr.push(initialAdObject(i));
    }
    return arr;
  };

  window.data = {
    adObjs: generateAdObjects(DIALOG_COUNT)
  };

})();
