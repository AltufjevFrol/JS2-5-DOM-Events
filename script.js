'use strict';

// Код валидации формы
function validateForm (settings) {
/*
*получаем форму которую необходимо проверять
*/
var form = document.getElementById(settings.formId);

/*
*слушаем на ней события
*/
form.addEventListener('blur', handlerBlur, true)
form.addEventListener('focus', handlerFocus, true)
form.addEventListener('submit', handlerSubmit)

function handlerBlur (event) {
if (event.target.tagName === 'INPUT') {
if (!checkInput(event.target)) {//если проверка не пройдена
	event.target.classList.add(settings.inputErrorClass)
}
}
}

function checkInput(input){// возвращает true или false
	var empty = true;
	var leter = true;
	var number = true;
	var phone = true;

	if (input.dataset.hasOwnProperty('required')){
		//проверка на заполнение
		if (input.value.length === 0){empty = false}
	}

	if (input.dataset.validator){
		//проверка в зависимости от типа валидатора

		if (input.dataset.validator === 'letters'){
			//провкрка на текст
				if (empty === true && input.value.length === 0){return true}
				var reg=/^[а-яА-ЯёЁa-zA-Z]+$/;//^[а-яА-ЯёЁa-zA-Z]+$, /[a-zа-я]/g
				leter = reg.test(input.value);
			}
			
		if (input.dataset.validator === 'number'){
			//проверка на цыфры
			if (empty === true && input.value.length === 0){return true}
			var reg = /^[0-9+-]+$/;//^[0-9]+$
			var ofNum = reg.test(input.value) 
			var max = true;
			var min = true;
			if(input.dataset.validatorMin){
				max = +input.dataset.validatorMin <= input.value;
			}
			if (input.dataset.validatorMax) {
				min = input.value <= +input.dataset.validatorMax;
			}
			number = ofNum && max && min;
		}
			if (empty === true && input.dataset.validator === 'regexp'){
				//проверка на шаблон
			if (input.value.length === 0){return true}
				phone = new RegExp(input.dataset.validatorPattern).test(input.value)
			}

	}

	return empty && leter && number && phone;
}

function handlerFocus(event){
	if(event.target.tagName === 'INPUT'){
	event.target.classList.remove('input_error');
	}
}

function handlerSubmit (event){
	event.preventDefault();
	var self = this;
	var inputs = Array.from(document.querySelectorAll('input'));
	//проверили импуты
	for (var i = 0; i<inputs.length; i++){
		if (!checkInput(inputs[i])){
			inputs[i].classList.add(settings.inputErrorClass)
			break;// после первой ошибки заканчиваем проверять другие поля
		}
	}
	
// посчитали ошибочные
	var countErr = 0;
	inputs.forEach(function(input){
		if (input.classList.contains(settings.inputErrorClass)){
			countErr++;
		}
	});
// ошибки есть? ошибок нет!
	if (countErr>0){
		self.classList.remove(settings.formValidClass);
		self.classList.add(settings.formInvalidClass);
	} else {
		self.classList.remove(settings.formInvalidClass);
		self.classList.add(settings.formValidClass);
	}

}

}
