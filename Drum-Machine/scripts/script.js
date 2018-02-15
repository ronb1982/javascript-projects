var soundController = (function() {
    var library, sound;

    library = {
        dKey: 'drum_d.wav'
    };

    return {
        playSound: function(key) {
            switch (key.toLowerCase()) {
                case "d":
                    sound = new Audio(library.dKey);
                    sound.play();
                    break;
                default:
                    console.log('No sound played.');
            }
        }
    }
})();

// UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        bigKeyBtn: '.big__key',
        bigLetterLabel: '.big__key--letter'
    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();

// APP CONTROLLER
var controller = (function(soundCtrl, UICtrl) {
    var DOM = UICtrl.getDOMStrings();
    var bigKey = document.querySelector(DOM.bigKeyBtn);

    var setupEventListeners = function() {
        bigKey.addEventListener('click', playSound);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 100 || e.which === 100) {
                playSound();
            }
        });

        // Event listeners for color on mouse events
        addEventListenerMulti(bigKey, 'mousedown mouseup', toggleBGColor);
        addEventListenerMulti(document, 'keydown keyup', toggleBGColor);
    };

    var toggleBGColor = function(e) {
        console.log(e.type);

        if (e.type === 'mousedown' || e.type === 'keydown')  {
            bigKey.style.backgroundColor = 'red';
            bigKey.style.color = 'white';
        } else if (e.type === 'mouseup' || e.type === 'keyup') {
            bigKey.style.backgroundColor = 'white';
            bigKey.style.color = 'black';
        }
    };

    var playSound = function() {
        // Play the drum sound.
        var keyChar = document.querySelector(DOM.bigLetterLabel).textContent;
        soundCtrl.playSound(keyChar);
    };

    function addEventListenerMulti(ele, eventNames, listenerCallback) {
        var events = eventNames.split(' ');

        for (var i = 0; i < events.length; i++) {
            ele.addEventListener(events[i], listenerCallback);
        }
    }

    return {
        init: function() {
            setupEventListeners();
        }
    }
})(soundController, UIController);

controller.init();
