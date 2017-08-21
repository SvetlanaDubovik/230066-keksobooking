(function () {
    'use strict';

    var TITLE_VALUES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var TYPE_VALUES = ['flat', 'house', 'bungalo'];
    var TYPE_VALUES_OBJ = {
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
    };
    var CHEK_IN_OUT_VALUES = ['12.00', '13.00', '14.00'];
    var FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var AVATAR_ADDRESS = [1, 2, 3, 4, 5, 6, 7, 8];
    var AD_COUNT = 8;

    var generateRandomNumber = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };

    var generateRandomValue = function (value) {
        var number = generateRandomNumber(0, value.length - 1);
        return value[number];
    };
    //перемешивание массива по алгоритму Фишера-Йетса
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
            xy = generateRandomNumber(300, 900) + '+' + generateRandomNumber(100, 500);
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

    var locations = generateLocations(AD_COUNT);

    //создание объектов
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

    var adObjects = generateAdObjects(AD_COUNT);

    //создание DOM-элементов
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
            if (pr) {
                attr(elem, pr, params[pr]);
            }
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

    //вывод объектов на карту
    var showMarkers = function (arrObj) {
        var tokyoPinMap = document.querySelector('.tokyo__pin-map');
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < arrObj.length; i++) {
            fragment.appendChild(generateMarkerLayout(arrObj[i].location.x, arrObj[i].location.y, arrObj[i].author.avatar));
        }
        tokyoPinMap.appendChild(fragment);
    };

    showMarkers(adObjects);

    var showAd = function (k) {
        var template = document.querySelector('#lodge-template');
        var element = template.content.querySelector('.dialog__panel').cloneNode(true);
        element.children[0].textContent = adObjects[k].offer.title;
        element.children[1].textContent = adObjects[k].offer.address;
        element.children[2].textContent = adObjects[k].offer.price + ' \u20bd/ночь';
        element.children[3].textContent = adObjects[k].offer.type;
        element.children[4].textContent = 'Для ' + adObjects[k].offer.guests + ' гостей в ' + adObjects[0].offer.rooms + ' комнатах';
        element.children[5].textContent = 'Заезд после  ' + adObjects[k].offer.checkin + ', выезд до  ' + adObjects[0].offer.checkout;

        var span = null;
        var length = adObjects[k].offer.features.length;
        for (var i = 0; i < length; i++) {
            span = '';
            span = newElem('span', {
                class: 'feature__image feature__image--' + adObjects[k].offer.features[i]
            });
            element.children[6].appendChild(span);
        }

        element.children[7].textContent = adObjects[k].offer.description;
        var offerDialog = document.querySelector('#offer-dialog');
        var dialogPanel = offerDialog.querySelector('.dialog__panel');
        offerDialog.replaceChild(element, dialogPanel);
        var dialogTitle = offerDialog.querySelector('.dialog__title');
        dialogTitle.children[0].setAttribute('src', adObjects[k].author.avatar);
    };

    showAd(0);

})();