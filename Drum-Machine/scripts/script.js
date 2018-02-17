var soundController = (function() {
    var fileLibrary;

    // Hit, melody, percussion
    fileLibrary = {
        'Q': ['drum_q.wav', false, null, 'hit'],
        'W': ['808drum_w.wav', false, 0.5, 'hit'],
        'E': ['808snare_e.wav', false, null, 'hit'],
        'A': ['bellsloop85_a.wav', true, null, 'melody'],
        'S': ['playboy140_s.wav', true, null, 'melody'],
        'D': ['strings140_d.wav', true, 0.3, 'melody'],
        'Z': ['shaker85_z.wav', true, null, 'percussion'],
        'X': ['hihat140_x.wav', true, null, 'percussion'],
        'C': ['verbyclaps140_c.wav', true, 0.5, 'percussion']
    };

    var removeExistingAudioTracks = function(selector, callback) {
        var elements = document.querySelectorAll(selector);

        if (elements) {
            if (callback) {
                callback(elements, function(trackEl) {
                    trackEl.parentNode.removeChild(trackEl);
                });
            } else if (elements[0]) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
    };

    var adjustVolume = function(sound, newVol) {
        if (newVol && !isNaN(newVol)) {
            sound.volume = newVol;
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
                            removeExistingAudioTracks('#' + DOM.loopAudioIdPrefix + fileArr[3], null);

                            // 1 ID for instrument loops, 1 ID for percussion loops

                            html = '<audio class="%class%" id="%id%" src="%s%" type="audio/wav"></audio>';
                            newHtml = html.replace('%class%', DOM.loopAudioClass);
                            newHtml = newHtml.replace('%id%', DOM.loopAudioIdPrefix + fileArr[3]);
                            newHtml = newHtml.replace('%s%', fileArr[0]);
                            console.log(newHtml);

                            document.querySelector('.' + DOM.container).insertAdjacentHTML('afterbegin', newHtml);
                            sound = document.querySelector('.' + DOM.loopAudioClass);

                            sound.addEventListener('timeupdate', function(){
                                var buffer = .50;
                                if (this.currentTime >= this.duration - buffer) {
                                    this.currentTime = 0;
                                    this.play();
                                }
                            }, false);
                        } else {
                            // Play a single hit
                            sound = new Audio(fileArr[0]);
                        }
                    }

                    adjustVolume(sound, fileArr[2]);
                    sound.play();
                    break;
                }
            }
        },
        stopPlaying : function(selector, callback) {
            removeExistingAudioTracks(selector, callback);
        }
    }
})();

// UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        bigKeyBtn: 'big__key',
        bigKeyIdPrefix: 'big-key-',
        btnClose: 'close',
        btnStopLoop: 'stop-loop',
        container: 'container',
        dataKeydownCode: 'data-keydown',
        dataKeypressCode: 'data-keypress',
        introModal: 'modal__box',
        loopAudioClass: 'loop-track',
        loopAudioIdPrefix: 'loop-'
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
                        if (c === DOMStrings.bigKeyBtn) {
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
            targetID = document.querySelector('#' + DOMStrings.bigKeyIdPrefix + arg).id;
        }

        return {
            key: keyChar,
            id: targetID
        };
    };

    var introModal = function(modal, btnClose) {

        if (modal && btnClose) {
            // Show modal window on page load
            window.onload = function() {
                modal.style.display = 'block';
            };

            // Hide modal when the user clicks the "Close" bytton
            btnClose.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            }
        }
    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        },
        displayModal: function(modal, btnClose) {
            introModal(modal, btnClose);
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

    var nodeListForEach  = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
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
            var bigKeys, keyChar, modal, btnClose;

            bigKeys = document.querySelectorAll('.' + DOM.bigKeyBtn);

            nodeListForEach(bigKeys, function(k) {
                keyChar = UICtrl.getkeyCharFromID(k.id);

                setupKeyEventListeners(k, k.id);

                if (keyChar && keyCodes.hasOwnProperty(keyChar)) {
                    document.getElementById(k.id).setAttribute(DOM.dataKeydownCode, keyCodes[keyChar].keydown);
                    document.getElementById(k.id).setAttribute(DOM.dataKeypressCode, keyCodes[keyChar].keypress);
                }
            });

            setupKeyEventListeners(document);

            modal = document.getElementById(DOM.introModal);
            btnClose = document.querySelector('.' + DOM.btnClose);
            console.log(modal);
            console.log(btnClose);
            UICtrl.displayModal(modal, btnClose);

            try {
                // Stop all looped audio
                document.querySelector('#' + DOM.btnStopLoop).addEventListener('click', function() {
                    console.log('clicked');
                    soundCtrl.stopPlaying('.' + DOM.loopAudioClass, nodeListForEach);
                });
            } catch (e) {
                console.log('Error occurred: ' + e);
            }

            function setupKeyEventListeners(el, elId) {
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
