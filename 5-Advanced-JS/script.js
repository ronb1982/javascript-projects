// Simple object creation
/*var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// Function constructor - capitalize variable name
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// Add calculateAge() function to prototype for inheritance
Person.prototype.calculateAge = function() {
    console.log(2016 - this.yearOfBirth);
};

// Add property to prototype
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);*/

// Object.create to create method
/*
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
*/
/*
// Primitives vs objects
// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);

// Objects
var obj1 = {
    name: 'John',
    age: 26
}

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a,b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);
console.log(age);
console.log(obj.city);
*/

///////////////////////////////////////////
// Lecture: Passing functions as arguments
/*var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {

    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    }

    return -1;
}

// Callback function - called later by passing function as argument
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);*/
/*
///////////////////////////////////////////
// Lectures: Functions returning functions
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', what subject do you teach?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');

var designerQuestion = interviewQuestion('designer');
designerQuestion('John');
designerQuestion('Jane');
designerQuestion('Mark');

interviewQuestion('teacher')('Mark');

// Passing functions as arguments

var a = 20;
var b = 40;

function calc(a, b, fn) {
    return fn(a,b);
}

function add(a,b) {
    return a + b;
}

var result = calc(a, b, add);
console.log(result);

// Returning functions from Functions
function calcReturnFunc() {
    return function(a,b) {
        return "Returned value: " + (a + b);
    }
}

var returnFunc = calcReturnFunc();
var val = returnFunc(a,b);
console.log(val);
*/

///////////////////////////////////////////
// Lecture: Immediately Invoked Function Expressions (IIFE)

/*function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();
*/
/*
// Use IIFE to hide variables from global scope
(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);


///////////////////////////////
// Lecture: Closures
function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);
*/
//retirement(66)(1990);
/*
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ', what subject do you teach?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
*/
/*
// Closure function
function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log(name + ', what subject do you teach?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('teacher')('John');
*/

///////////////////////////////////
// Lecture: Bind, call, apply
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +
            this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +
            this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. ' +
            'Have a nice ' + timeOfDay);
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal', 'morning');

// Use call method to borrow method from the john object
john.presentation.call(emily, 'friendly', 'afternoon');

// Use apply method (same as call method) but second arg accepts an array of arguments
john.presentation.apply(emily, ['friendly', 'afternoon']);

// Use bind method (similar to call method), but it doesn't immediately call the function.
// With bind(), we can call a method with a preset argument.
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);
*/

// Coding Challenge 4 - Quiz game
//  Build a function constructor to describe a question
(function() {
    var quit = false;
    var pressEnterMessage = 'Press ENTER to go to the next question';

    var Question = function(question, answers, correctChoice) {
        this.question = question;
        this.answers = answers;
        this.correctChoice = correctChoice;
    }

    var arrQuestions = [
        new Question(
            'What is your favorite video game?',
            [
                'Street Fighter V',
                'Sonic the Hedgehog',
                'Super Mario Bros.'
            ],
            1
        ),
        new Question(
            'Which continent does Belgium belong to?',
            [
                'South America',
                'Europe',
                'Asia',
                'North America'
            ],
            2
        ),
        new Question(
            'How much is 0 degrees Celsius in Fahrenheit (F)?',
            [
                '5 degrees F',
                '23 degrees F',
                '32 degrees F'
            ],
            3
        )
    ];

    // Attaching methods to prototype
    Question.prototype.displayQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log("\t" + (i + 1) + ": " + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function(userAnswer) {
        if (userAnswer === 'q') {
            console.log('Thanks for playing!');
            quit = true;
        } else if (parseInt(userAnswer) === this.correctChoice) {
            console.log("Correct!");
            confirm(pressEnterMessage);
        } else {
            console.log("Incorrect!");
            confirm(pressEnterMessage);
        }
    };

    do {
        (function () {
            var selected = (function(arrQuestions) {
                var questionNum = Math.floor(Math.random() * arrQuestions.length);
                return arrQuestions[questionNum];
            })(arrQuestions);

            selected.displayQuestion();

            (function (question) {
                var userAnswer = prompt("Enter answer here. Enter 'q' to quit game: ");
                selected.checkAnswer(userAnswer);
            })(selected);
        })();
    } while (!quit);
})();
