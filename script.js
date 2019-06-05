'use strict';

// Код валидации формы
function validateForm () {

}

function handler(event) {
	event.preventDefault();
this.setAttribute('style', 'background: red');
console.log(event);
}

function handler2(event) {
	event.preventDefault();
event.target.setAttribute('style', 'background: red');
console.log(event);
}

var button = document.querySelector('button');
var body = document.querySelector('body');
var form = document.querySelector('form');
var input = document.querySelector('#profile-age');
console.log(button);
console.log(body);
console.log(form);

body.addEventListener('submit', handler);
body.addEventListener('blur', handler2, true)
