var soundController = (function() {
    var fileLibrary;

    fileLibrary = {
        'Q': ['drum_d.wav', false],
        'W': ['808drum_w.wav', false],
        'E': ['808snare_e.wav', false],
        'A': ['bellsloop85_a.wav', true],
        'S': ['playboy140_s.wav', true]
    };

    var removeExistingAudio = function(idSelector) {
        var existingEle = document.getElementById(idSelector);

        if (existingEle) {
            existingEle.parentNode.removeChild(existingEle);
        }
    };

    return {
        playFile: function(keyChar, DOM) {
            var sound, html, newHtml, element;

            for (var item in fileLibrary) {
                if (fileLibrary.hasOwnProperty(keyChar.toUpperCase())) {

                    var fileArr = fileLibrary[keyChar];

                    if (fileArr) {
                        if (fileArr[1]) {
                            // Remove existing audio element
                            removeExistingAudio(DOM.loopAudioElement);

                            html = '<audio id="%id%" src="%s%" type="audio/wav"></audio>';
                            newHtml = html.replace('%id%', DOM.loopAudioElement);
                            newHtml = newHtml.replace('%s%', fileLibrary[keyChar][0]);
                            console.log(newHtml);

                            document.querySelector(DOM.container).insertAdjacentHTML('afterbegin', newHtml);
                            sound = document.getElementById(DOM.loopAudioElement);

                            sound.addEventListener('timeupdate', function(){
                                var buffer = .50;
                                if (this.currentTime > this.duration - buffer) {
                                    this.currentTime = 0;
                                    this.play();
                                }
                            }, false);
                        } else {
                            // Play a single hit
                            sound = new Audio(fileLibrary[keyChar][0]);
                            sound.volume = 0.7;
                        }
                    }

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
        container: '.container',
        dataKeydownCode: 'data-keydown',
        dataKeypressCode: 'data-keypress',
        loopAudioElement: 'loop-track'
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
        var keyChar, target, targetID;

        if (typeof arg === 'object') {
            target = arg.target;

            try {
                while (!targetID) {
                    for (var c of target.classList) {
                        if (c === DOMStrings.bigKeyBtn.substr(1)) {
                            targetID = target.id;
                            break;
                        }
                    }
                    if (!targetID) target = target.parentNode;
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
            if (eventType === 'mousedown' || eventType === 'keydown') {
                targetEle.classList.add('big__key--active');
                targetEle.classList.remove('big__key--inactive');
            } else if (eventType === 'mouseup' || eventType === 'keyup') {
                targetEle.classList.add('big__key--inactive');
                targetEle.classList.remove('big__key--active');
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
        console.log(e.key);
        if (e.key) {
            target = UICtrl.getTargetElement(e.key.toUpperCase());
        } else {
            target = UICtrl.getTargetElement(e);
        }

        if (e.type === 'click' || (e.type === 'keypress' && !hasEventFired)) {
            soundCtrl.playFile(target.key, DOM);
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
        },
        testing: function() {
            return keyCodes;
        }
    }
})(soundController, UIController);

controller.init();
