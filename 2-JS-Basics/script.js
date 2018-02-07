// var name = 'John';
// console.log(name);
//
// var lastName = 'Smith';
// console.log(lastName);
//
// var age = 26;
// console.log(age);


// // Lecture: variables 2
// var name = 'John';
// var age = 26;
//
// // Type coercion
// console.log(name + age);
//
// var job, isMarried;
// console.log(job);
// job = 'teacher';
// isMarried = false;
//
// console.log(name + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried + '.');
//
// // var lastName = prompt('What is the last name? ');
// // console.log(lastName);
//
// alert(name + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried + '.');

// // Lecture: operators
// var now = 2016;
// var birthYear = now - 26;
// birthYear = now - 26 * 2;
//
// console.log(birthYear);
////////////////////////////////////////////
// Lecture: if/else statements
//
// var name = 'John';
// var age = 26;
// var isMarried = prompt('Is John married?');
//
// if (isMarried === 'yes') {
//   console.log(name + ' is married!');
// } else {
//   console.log(name + ' will hopefully marry soon :)');
// }
//
// // Type coercion
// if (23 == "23") {
//   console.log('Number is equal');
// }

// Lecture: boolean logic and switch
// var age = 25;
//
// if (age < 20) {
//   console.log('John is a teenager.');
// } else if (age > 20 && age < 30) {
//   console.log('John is a young man.');
// } else {
//   console.log('John is a man.');
// }
//
// var job = prompt('What does John do?');
//
// switch (job) {
//   case 'teacher':
//     console.log('John teaches kids.');
//     break;
//   case 'driver':
//     console.log('John drives a cab in Lisbon.');
//     break;
//   case 'cop':
//     console.log('John helps fight crime.');
//     break;
//   default:
//     console.log('John does something else.');
// }
//
// var johnAge = prompt("Enter John's age");
// var johnHeight = prompt("Enter John's height");
// var friend1Age = prompt("Enter Friend 1's age");
// var friend1Height = prompt("Enter Friend 1's height");
// var friend2Age = prompt("Enter Friend 2's age");
// var friend2Height = prompt("Enter Friend 2's height");
//
// var johnScore = johnHeight + (5 * johnAge);
// var friend1Score = friend1Height + (5 * friend1Age);
// var friend2Score = friend2Height + (5 * friend2Age);
//
// var johnWins = johnScore > friend1Score && johnScore > friend2Score;
// var friend1Wins = friend1Score > johnScore && friend1Score > friend2Score;
// var friend2Wins = friend2Score > johnScore && friend2Score > friend1Score;
//
// if (johnWins) {
//   console.log('John wins with a score of ' + johnScore);
// } else if (friend1Wins) {
//   console.log('Friend 1 wins with a score of ' + friend1Score);
// } else if (friend2Wins) {
//   console.log('Friend 2 wins with a score of ' + friend2Score);
// } else {
//   console.log('DRAW!');
// }

// Lecture: Functions
// function calculateAge(yearOfBirth) {
//   var age = 2018 - yearOfBirth;
//   return age;
// }
//
// var ageJohn = calculateAge(1982);
// var ageMike = calculateAge(1969);
// var ageMary = calculateAge(1948);
// console.log(ageJohn);
// console.log(ageMike);
// console.log(ageMary);
//
// function yearsUntilRetirement(name, year) {
//     var age = calculateAge(year);
//     var retirement = 65 - age;
//
//     if (retirement > 0) {
//       console.log(name + ' retires in ' + retirement + ' years.');
//     } else if (retirement === 0) {
//       console.log(name + ' retires this year!');
//     } else {
//       console.log(name + ' has already retired.');
//     }
// }
//
// yearsUntilRetirement('John', 1990);
// yearsUntilRetirement('Mike', 1969);
// yearsUntilRetirement('Mary', 1953);

// Lecture: Statements and expressions
// // Function statement
// function someFunc(par) {
//
// }
//
// // Function expression
// var someFun = function(par) {
//
// }



// Lectures: Arrays
// var names = ['John', 'Jane', 'Mark'];
// var years = new Array(1990, 1969, 1948);
//
// console.log(names[0]);
// names[1] = 'Ben';
// console.log(names[1]);
//
// var john = ['John', 'Smith', 1990, 'designer', false];
// john.push('blue');
// john.unshift('Mr.');
// john.shift();
// console.log(john.indexOf('Smith'));
// console.log(john);
//
// if (john.indexOf('teacher') === -1) {
//   console.log('John is NOT a teacher');
// }
///////////////////////////////////////////
// Lecture: Objects
// var john = {
//   name: 'John',
//   lastName: 'Smith',
//   yearOfBirth: 1990,
//   job: 'teacher',
//   isMarried: false
// };
//
// console.log(john.lastName);
// console.log(john['lastName']);
//
// var xyz = 'job';
// console.log(john[xyz]);
//
// john.lastName = 'Miller';
// john['job'] = 'programmer';
// console.log(john);
//
// var jane = new Object();
// jane.name = 'Jane';
// jane.lastName = 'Smith';
// jane['yearOfBirth'] = 1969;
// jane['job'] = 'retired';
// jane.isMarried = true;
// console.log(jane);

///////////////////////////////
// Lecture: Objects and methods

//v 1.0
// var john = {
//   name: 'John',
//   lastName: 'Smith',
//   yearOfBirth: 1990,
//   job: 'teacher',
//   isMarried: false,
//   family: ['Jane', 'Mark', 'Bob'],
//   calculateAge: function() {
//     return 2018 - this.yearOfBirth;
//   }
// };
//
// var age = john.calculateAge();
// john.age = age;
// console.log(john);

//v2.0
// var john = {
//   name: 'John',
//   lastName: 'Smith',
//   yearOfBirth: 1990,
//   job: 'teacher',
//   isMarried: false,
//   family: ['Jane', 'Mark', 'Bob'],
//   calculateAge: function() {
//     this.age = 2016 - this.yearOfBirth;
//   }
// };
//
// john.calculateAge();
// console.log(john);

/////////////////////////////////////
// Lecture: Loops
// for (var i = 0; i < 10; i++) {
//   console.log(i);
// }

// var names = ['John', 'Jane', 'Mary', 'Mark', 'Bob'];
// for (var i = 0; i < names.length; i++) {
//   console.log(names[i]);
// }

// Reverse order
// for (var i = names.length - 1; i >= 0; i--) {
//   console.log(names[i]);
// }

// var i = 0;
// while (i < names.length) {
//   console.log(names[i]);
//   i++;
// }

// for (var i = 1; i <= 5; i++) {
//   console.log(i);
//   if (i === 3) break;
// }
//
// for (var i = 1; i <= 5; i++) {
//   if (i === 3) continue;
//   console.log(i);
// }

// Coding Challenge 2
var birthYears1 = [1982, 1990, 2010, 1955];
var birthYears2 = [2007, 2017, 1995, 2000];

var full_1 = printFullAge(birthYears1);
console.log("////////////////////////");
var full_2 = printFullAge(birthYears2);
console.log("First set: " + full_1);
console.log("Second set: " + full_2);

function calculateAge(yearOfBirth) {
  return 2018 - yearOfBirth;
}

function printFullAge(birthYears) {
  var fullAge = 18;
  var ages = [];
  var fullAgeArr = [];

  for (var i = 0; i < birthYears.length; i++) {
    //ages.push(calculateAge(birthYears[i]));
    var age = calculateAge(birthYears[i]);
    var isFullAge = age >= fullAge;
    fullAgeArr.push(isFullAge);
    console.log("Person " + (i + 1) + "'s age: " + age +
      ", Is of full age? " + isFullAge);
  }

  // for (var i = 0; i < ages.length; i++) {
  //   var isFullAge = ages[i] >= fullAge;
  //   fullAgeArr.push(isFullAge);
  //   console.log("Person " + (i + 1) + "'s age: " + ages[i] +
  //     ", Is of full age? " + isFullAge);
  // }

  return fullAgeArr;
}
