// Lecture: let and const
/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
//ame6 = 'Jane Miller';
console.log(name6);

// ES5 - Variables are scope-restricted, and cannot be accessed outside of the SCOPE
// in which they are defined. They can however, be accessed within another code block
// as long as that block lives inside of the current scope.
function driversLicence5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + ', born in ' + yearOfBirth +
    ', is now officially allowed to drive a car.');
}

driversLicence5(true);

// ES6 - Variables are block-restricted and cannot be accessed outside of the BLOCK
// in which they are defined.
function driversLicence6(passedTest) {

    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }
    console.log(firstName + ', born in ' + yearOfBirth +
    ', is now officially allowed to drive a car.');
}

driversLicence6(true);

let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
*/

///////////////////////////////////////
// Lecture: Blocks and IIFEs
/*
// ES6
// IIFE
{
    const a = 1;
    let b = 2;
    var c = 3;
}

console.log(c);

// ES5
(function() {
    var c = 3;
})();
*/


///////////////////////////////////
// Lecture: Strings
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}

// ES5
console.log('This is ' + firstName +
        ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' +
        calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. ` +
`Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(firstName.repeat(5));
*/

/////////////////////////////////////////
// Lecture: Arrow functions
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2018 - el;
});
console.log(ages5);

// ES6
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/

//////////////////////////////////////////
// Lecture: Arrow functions 2 - this keyword
/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position +
            ' and it is ' + self.color;

            alert(str);
        });
    }
}

box5.clickMe();


// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position +
            ' and it is ' + this.color;

            alert(str);
        });
    }
}

box6.clickMe();

function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}.`);
    console.log(arr);
}

new Person('Jake').myFriends6(friends);
*/

/////////////////////////////////////////////
// Lecture: Destructing
/*
// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6 - Creating variables dynamically
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const { firstName, lastName } = obj;
console.log(firstName);
console.log(lastName);

const { firstName: a, lastName: b } = obj;
console.log(a);
console.log(b);

// Returning multiple values from a function
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}
const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
*/

////////////////////////////////////////////////////
// Lecture: Arrays
/*
// ES6 - returns node list
const boxes = document.querySelectorAll('.box');

// ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
/*boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});
*/
/*
// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// ES5
/*
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }

    boxesArr5[i].textContent = 'I changed to blue!';
}
*/
/*
// ES6 - For...of loop
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6 - Return index where condition is true
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/

//////////////////////////////////////////////////
// Lecture: Spread operator
/*
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6 - Spread operator (...)
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];

const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [h, ...boxes];
console.log(all);

Array.from(all).forEach(cur => cur.style.color = 'purple');
*/
////////////////////////////////////
// Lecture: Rest parameters
/*
// ES5
function isFullAge5() {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((2018 - cur) >= 18);
    });
}

//isFullAge5(1990, 2001, 1965);
//isFullAge5(1990, 2001, 1965, 2016, 1987);

// ES6
function isFullAge6(...years) {
    years.forEach(cur => console.log((2018 - cur) >= 18));
}

isFullAge6(1990, 2001, 1965);
isFullAge6(1990, 2001, 1965, 2016, 1987);


// ES5
function isFullAge5(limit) {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    console.log(argsArr);
    console.log(limit);
    argsArr.forEach(function(cur) {
        console.log((2018 - cur) >= limit);
    });
}

isFullAge5(21, 1990, 1999, 1965);
//isFullAge5(1990, 2001, 1965, 2016, 1987);

// ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log((2018 - cur) >= limit));
}

isFullAge6(16, 1990, 2001, 1965);
isFullAge6(16, 1990, 2001, 1965, 2016, 1987);
*/

//////////////////////////////////////////////
// Lecture: Default parameters
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    // Default vars
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
console.log(john);

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');
console.log(emily);

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith',
    nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
var john = new SmithPerson('John', 1990);
console.log(john);

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');
console.log(emily);
*/

///////////////////////////////////////////
// Lecture: Maps
/*
// New to ES6 - Maps
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScrtipt version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

/*
console.log(question);

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) {
    //question.delete(4);
    console.log('Answer 4 is here.');
}

//question.clear();

// Loop through a Map
//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}.`));

// Iterate using for...of loop
for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));
*/


/////////////////////////////////////////////
// Lecture: Classes
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');


// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Hey there!');
    }
}

var john6 = new Person6('John', 1990, 'teacher');
john6.calculateAge();

Person6.greeting();
*/

////////////////////////////////////////
// Lecture: Classes and subclasses
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job); // call parent class
    this.olympicGames = olympicGames;
    this.medals = medals;
};

// Set prototype to establish inheritance prototype chain
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
};

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

console.log(johnAthlete5);
johnAthlete5.calculateAge();

johnAthlete5.wonMedal();
*/
/*
// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
*/

//////////////////////////////////////////
// Coding challenge 5
{
    class Town {
        constructor(...attr) {
            [this.name, this.parks, this.streets] = attr;
        }
    }

    class Construction {
        constructor(...attr) {
            [this.name, this.buildYear, this.type] = attr;
        }

        showData() {
            console.log('\n============================\n');
            console.log(`Construction type: ${this.type}`);
            console.log(`Name: ${this.name}`);
            console.log(`Year built: ${this.buildYear}`);
            console.log(`Age (in years): ${this.getAge()}`);
        }

        getAge() {
            return new Date().getFullYear() - this.buildYear;
        }
    }

    class Park extends Construction {
        constructor(...attr) {
            super(attr['name'], attr['buildYear'], 'Park');
            [this.name, this.buildYear, this.numTrees = 0, this.area = 0] = attr;
        }

        getTreeDensity() {
            return (this.numTrees / this.area).toFixed(2);
        }

        showData() {
            super.showData();
            console.log(`Tree count: ${this.numTrees}`);
            console.log(`Area (in size): ${this.area}`);
            console.log(`Tree density: ${this.getTreeDensity()}`);
        }
    }

    class Street extends Construction {
        constructor(...attr) {
            super(attr['name'], attr['buildYear'], 'Street');
            [this.name, this.buildYear, this.length = 0] = attr;
            this.setSizeClassification();
        }

        setSizeClassification() {
            let length = this.length;

            if (length > 0 && length <= 250) {
                this.sizeClassification = 'tiny';
            } else if (length > 250 && length <= 500) {
                this.sizeClassification = 'small';
            } else if (length > 1000 && length <= 2500) {
                this.sizeClassification = 'big';
            } else if (length > 2500) {
                this.sizeClassification = 'huge';
            } else {
                this.sizeClassification = 'normal';
            }
        }

        showData() {
            super.showData();
            console.log(`Street length: ${this.length}`);
            console.log(`Size classification: ${this.sizeClassification}`);
        }
    }

    var townMap = new Map();

    // Town: Boeblingen
    const townBoeblingen = new Town(
        'Boeblingen',
        [
            new Park('See', 1865, 3245, 166.35),
            new Park('Tueringen', 1984, 1204, 212)
        ],
        [
            new Street('Herdweg', 1944, 325),
            new Street('Esslingerstrasse', 2001, 500),
            new Street('Theodorheussstrasse', 1855, 1034),
            new Street('Kleinhaus', 2008, 3530),
            new Street('Aufdenweg', 1734, 10024),
            new Street('Fischer', 1994, 1345)
        ]
    );

    // Town: Rego Park
    const townRegoPark = new Town(
        'Rego Park',
        [
            new Park('Rego Park Municipal Park', 1975, 302, 166.35),
            new Park('Flushing Meadows Park', 1922, 1435, 835.24)
        ],
        [
            new Street('Junction Blvd.', 1945, 489),
            new Street('Queens Blvd.', 2001, 5030),
            new Street('62nd Drive', 2010, 231),
            new Street('Austin St.', 1898, 3530)
        ]
    );

    townMap.set(townBoeblingen.name, townBoeblingen);
    townMap.set(townRegoPark.name, townRegoPark);

    townMap.forEach((value, key) => {
        displayReport(value.name, value.parks, value.streets);
        console.log(`\n\nParks in ${key} with more than 1000 trees:`);
        value.parks.forEach(p => {
            if (p.numTrees >= 1000) {
                console.log(`-- ${p.name}`);
            }
        });
    });

    function displayReport(townName, parks, streets) {
        console.log(`----- ${townName.toUpperCase()} TOWN REPORT -----`);
        getParksReport(parks);
        getStreetsReport(streets);
    }

    function getParksReport(parks) {
        if (parks) {
            console.log('\n============================\n');
            console.log(`Now displaying park info for ${this.name}:`);
            parks.forEach(p => p.showData());
        }
    }

    function getStreetsReport(streets) {
        if (streets) {
            console.log('\n============================\n');
            console.log(`Now displaying street info for ${this.name}:`);
            streets.forEach(s => s.showData());
        }
    }
}
