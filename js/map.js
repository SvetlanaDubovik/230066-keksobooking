(function () {
    'use strict';

    var TITLE_VALUES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var TYPE_VALUES = ['flat', 'house', 'bungalo'];
    var CHEK_IN_OUT_VALUES = ['12.00', '13.00', '14.00'];
    var FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var AVATAR_ADDRESS = [1, 2, 3, 4, 5, 6, 7, 8];

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

    var generateRandomNumber = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };

    var generateRandomValue = function (value) {
        var number = generateRandomNumber(0, value.length - 1);
        return value[number];
    };

    var initialAdObject = function (k) {
        var obj = {
            'author': {
                'avatar': 'img/avatars/user0' + avatarAddressMix[k] + '.png'
            },
            'offer': {
                'title': titleValuesMix[k],
                'address': location.x + ', ' + location.y,
                'price': generateRandomNumber(1000, 1000000),
                'type': TYPE_VALUES[generateRandomNumber(0, 2)],
                'rooms': generateRandomNumber(1, 5),
                'gueste': generateRandomNumber(1, 10),
                'checkin': CHEK_IN_OUT_VALUES[generateRandomNumber(0, 2)],
                'checkout': CHEK_IN_OUT_VALUES[generateRandomNumber(0, 2)],
                'features': mixArray(FEATURES_VALUES, false),
                'description': '',
                'photos': []
            },
            'location': {
                'x': generateRandomNumber(300, 900),
                'y': generateRandomNumber(100, 500)
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
    }

    var adObjects = generateAdObjects(8);



    var attr = function (el, at, value) {
        at = {
            'for': 'htmlFor',
            'class': 'className'
        }[at] || at;
        if (!value) {
            return el[at] || el.getAttribute(at) || '';
        } else {
            if (at == 'style') {
                el.style.cssText = value;
                return;
            }
            el[at] = value;
            if (el.setAttribute) el.setAttribute(at, value);
        }
    };

    var newElem = function (tag, params) {
        params = params || {};

        var elem = document.createElement(tag);

        for (var pr in params) {
            attr(elem, pr, params[pr]);
        }
        return elem;
    };

    var generateMarkerLayout = function (x, y, avatar) {
        var divBlock = newElem('div', {
            class: 'pin',
            style: 'left : ' + x + 'px; top : ' + y + 'px'
        });
        var pic = newElem('img', {
            src: '' + avatar,
            class: 'rounded',
            width: '40px',
            height: '40px',
            alt: ''
        });
        divBlock.appendChild(pic);
        return divBlock;
    };

    //    var generateMarkers = function (arrObj) {
    //        var arr = [];
    //        for (var i = 0; i < arrObj.length; i++) {
    //            arr.push(generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar));
    //        }
    //        return arr;
    //    };
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var showMarkers = function (arrObj) {
        var tokyoPinMap = document.querySelector('.tokyo__pin-map');
//        tokyoPinMap = '';
        //        var markers = generateMarkers(adObjects);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < arrObj.length; i++) {
            fragment.appendChild(generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar))
        }

        tokyoPinMap.appendChild(fragment);
    };

    showMarkers(adObjects);







})();