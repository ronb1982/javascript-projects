var soundController = (function() {
    var fileLibrary, sound;

    fileLibrary = {
        'Q': 'drum_d.wav',
        'W': '808drum_w.wav',
        'E': '808snare_e.wav',
        'A': 'hihat_a.wav'
    };

    return {
        playFile: function(keyChar) {
            for (var item in fileLibrary) {
                if (fileLibrary.hasOwnProperty(keyChar.toUpperCase())) {
                    sound = new Audio(fileLibrary[keyChar]);
                    sound.volume = 0.7;
                    sound.play();
                    break;
                }
            }
        }
    }
})();

// UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        bigKeyBtn: '.big__key',
        bigKeyIdPrefix: '#big-key-',
        dataKeydownCode: 'data-keydown',
        dataKeypressCode: 'data-keypress'
    };

    var getKeyCharacter = function(idSelector) {
        var keyChar;
        if (idSelector) {
            var idParts = idSelector.split('-');
            keyChar = idParts[2];
            return keyChar;
        }
        return '';
    };

    var getTarget = function(arg) {
        var keyChar, targetID;

        if (typeof arg === 'object') {
            var target = arg.target;

            try {
                while ((target = target.parentNode) && !target.getAttribute(DOMStrings.bigKeyBtn)) {
                    if (target.getAttribute('class') === DOMStrings.bigKeyBtn.substr(1)) {
                        targetID = target.id;
                        break;
                    }
                }
                keyChar = getKeyCharacter(target.id);
            } catch (e) {
                console.log('Error occurred: ' + e);
            }
        } else if (typeof arg === 'string') {
            keyChar = arg;
            targetID = document.querySelector(DOMStrings.bigKeyIdPrefix + arg).id;
        }

        return {
            key: keyChar,
            id: targetID
        };
    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        },
        getkeyCharFromID: function(idSelector) {
            return getKeyCharacter(idSelector);
        },
        getTargetElement: function(arg) {
            return getTarget(arg);
        },
        toggleBGColor: function(target, eventType) {
            var targetEle = document.getElementById(target.id);
            if (eventType === 'mousedown' || eventType === 'keydown')  {
                targetEle.style.backgroundColor = 'red';
                targetEle.style.color = 'white';
            } else if (eventType === 'mouseup' || eventType === 'keyup') {
                targetEle.style.backgroundColor = 'white';
                targetEle.style.color = 'black';
            }
        }
    }
})();

// APP CONTROLLER
var controller = (function(soundCtrl, UICtrl) {
    var hasEventFired = false;
    var DOM = UICtrl.getDOMStrings();

    // Define all keycodes
    var keyCodes = {
        Q: { keydown: 81, keypress: 113 },
        W: { keydown: 87, keypress: 119 },
        E: { keydown: 69, keypress: 101 },
        A: { keydown: 65, keypress: 97 },
        S: { keydown: 83, keypress: 115 },
        D: { keydown: 68, keypress: 100 },
        Z: { keydown: 90, keypress: 122 },
        X: { keydown: 88, keypress: 120 },
        C: { keydown: 67, keypress: 99 }
    };

    var triggerBigKeyEvents = function(e) {
        var keyCode, target;

        if (e.key) {
            target = UICtrl.getTargetElement(e.key.toUpperCase());
        } else {
            target = UICtrl.getTargetElement(e);
        }

        if (e.type === 'click' || (e.type === 'keypress' && !hasEventFired)) {
            soundCtrl.playFile(target.key);
            //hasEventFired = true; // Disable to allow repeated notes
        }

        if (e.type === 'keyup') {
            hasEventFired = false;
        }

        UICtrl.toggleBGColor(target, e.type);
    };

    return {
        init: function() {
            var bigKeys = document.querySelectorAll(DOM.bigKeyBtn);

            var nodeListForEach  = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(bigKeys, function(k) {
                var keyChar = UICtrl.getkeyCharFromID(k.id);

                setupEventListeners(k, k.id);

                if (keyChar && keyCodes.hasOwnProperty(keyChar)) {
                    document.getElementById(k.id).setAttribute(DOM.dataKeydownCode, keyCodes[keyChar].keydown);
                    document.getElementById(k.id).setAttribute(DOM.dataKeypressCode, keyCodes[keyChar].keypress);
                }
            });

            setupEventListeners(document);

            function setupEventListeners(el, elId) {
                if (elId) {
                    el.addEventListener('click', triggerBigKeyEvents);
                    el.addEventListener('mousedown', triggerBigKeyEvents);
                    el.addEventListener('mouseup', triggerBigKeyEvents);
                } else {
                    el.addEventListener('keypress', triggerBigKeyEvents);
                    el.addEventListener('keydown', triggerBigKeyEvents);
                    el.addEventListener('keyup', triggerBigKeyEvents);
                }

            }

            function addEventListenerMulti(ele, eventNames, listenerCallback) {
                var events = eventNames.split(' ');

                for (var i = 0; i < events.length; i++) {
                    ele.addEventListener(events[i], listenerCallback);
                }
            }
        },
        testing: function() {
            return keyCodes;
        }
    }
})(soundController, UIController);

controller.init();
