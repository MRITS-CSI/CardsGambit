const questions = [
	{
		question: 'Who is the ceo of google?',
		answers: [
			{ text: 'sundar pichai', correct: true },
			{ text: 'elon musk', correct: false },
			{ text: 'satya nadella ', correct: false },
			{ text: 'tim cook', correct: false },
		],
	},
	{
		question: 'Who is the ceo of microsoft?',
		answers: [
			{ text: 'elon musk', correct: false },
			{ text: 'satya nadella', correct: true },
			{ text: 'sundar pichai', correct: false },
			{ text: 'tim cook', correct: false },
		],
	},
	{
		question: 'Who is the ceo of apple?',
		answers: [
			{ text: 'tim cook', correct: true },
			{ text: 'elon musk', corect: false },
			{ text: 'sundar pichai', correct: false },
			{ text: 'satya nadella', correct: false },
		],
	},
];
var evaluation = [];
function setEvaluation() {
	for (i = 0; i < qlength; i++) {
		for (j = 0; j < 4; j++) {
			if (questions[i].answers[j].correct == true) {
				evaluation.push(j + 1);
			}
		}
	}
}
var attempts = 0;
function calculateAttempts() {
	for (i = 0; i < qlength; i++) {
		if (info[i] != -1) {
			attempts++;
		}
	}
}
var qindex = 0;
var qlength = questions.length;
var info = new Array(qlength).fill(-1);
document.addEventListener('DOMContentLoaded', show);
function show() {
	timerBegins();
	cardSetter();
	checkForPrev();
	var query = document.getElementById('question');
	query.innerText = questions[qindex].question;
	for (i = 1; i < 5; i++) {
		var option = document.getElementById('option' + i);
		option.innerText = questions[qindex].answers[i - 1].text;
		option.addEventListener('click', showColor);
	}
}
var nextButton = document.getElementById('nex');
nextButton.addEventListener('click', showNext);
function showNext() {
	if (qindex < qlength - 1) {
		qindex++;
		cardSetter();
		checkForPrev();
		var query = document.getElementById('question');
		query.innerText = questions[qindex].question;
		for (i = 1; i < 5; i++) {
			var option = document.getElementById('option' + i);
			option.innerText = questions[qindex].answers[i - 1].text;
			option.addEventListener('click', showColor);
		}

		for (i = 1; i < 5; i++) {
			if (document.getElementById('option' + i).style.background == 'cyan') {
				document.getElementById('option' + i).style.background = 'pink';
			}
		}
		check();
	}
	checkToSubmit();
}
var previousButton = document.getElementById('prev');
previousButton.addEventListener('click', showPrev);
function showPrev() {
	if (qindex > 0) {
		qindex--;
		cardSetter();
		if (qindex == 0) {
			previousButton.remove();
		}
		for (i = 1; i < 5; i++) {
			if (document.getElementById('option' + i).style.background == 'cyan') {
				document.getElementById('option' + i).style.background = 'pink';
			}
		}
		var query = document.getElementById('question');
		query.innerText = questions[qindex].question;
		for (i = 1; i < 5; i++) {
			var option = document.getElementById('option' + i);
			option.innerText = questions[qindex].answers[i - 1].text;

			option.addEventListener('click', showColor);
		}
		check();
	}

	checkForNext();
}

function showColor(e) {
	for (i = 1; i < 5; i++) {
		if (document.getElementById('option' + i).style.background == 'cyan') {
			document.getElementById('option' + i).style.background = 'pink';
		}
	}
	button = e.target;
	button.style.background = 'cyan';
	info[qindex] = button.value;
}
function check() {
	if (info[qindex] != -1) {
		document.getElementById('option' + info[qindex]).style.background = 'cyan';
	}
}

var time = document.getElementById('time');
var timer;
var minuteTimeLeft = 20;
var secTimeLeft = 60;

function timerBegins() {
	time.innerText = minuteTimeLeft + ':00';
	timer = setInterval(updateTimer, 1000);
}
function updateTimer() {
	if (secTimeLeft == 60) {
		minuteTimeLeft = minuteTimeLeft - 1;
	}
	secTimeLeft = secTimeLeft - 1;

	if (secTimeLeft > 0 && minuteTimeLeft >= 0) {
		if (
			minuteTimeLeft >= 0 &&
			minuteTimeLeft <= 9 &&
			secTimeLeft >= 0 &&
			secTimeLeft <= 9
		) {
			time.innerText = '0' + minuteTimeLeft + ':0' + secTimeLeft;
		} else if (minuteTimeLeft >= 0 && minuteTimeLeft <= 9) {
			time.innerText = '0' + minuteTimeLeft + ':' + secTimeLeft;
		} else if (secTimeLeft >= 0 && secTimeLeft <= 9) {
			time.innerText = minuteTimeLeft + ':0' + secTimeLeft;
		} else {
			time.innerText = minuteTimeLeft + ':' + secTimeLeft;
		}
	} else if (secTimeLeft == 0) {
		if (
			minuteTimeLeft >= 0 &&
			minuteTimeLeft <= 9 &&
			secTimeLeft >= 0 &&
			secTimeLeft <= 9
		) {
			time.innerText = '0' + minuteTimeLeft + ':0' + secTimeLeft;
		} else if (minuteTimeLeft >= 0 && minuteTimeLeft <= 9) {
			time.innerText = '0' + minuteTimeLeft + ':' + secTimeLeft;
		} else if (secTimeLeft >= 0 && secTimeLeft <= 9) {
			time.innerText = minuteTimeLeft + ':0' + secTimeLeft;
		} else {
			time.innerText = minuteTimeLeft + ':' + secTimeLeft;
		}
		minuteTimeLeft = minuteTimeLeft - 1;

		secTimeLeft = 60;
	} else {
		gameOver();
	}
}

function gameOver() {
	clearInterval(timer);
	main.classList.add('hide');
	won.classList.remove('hide');
	won.innerHTML = '<p>You Lost</p>';
}

function cardSetter() {
	for (i = 0; i < qlength; i++) {
		if (i == qindex) {
			document
				.getElementById('card')
				.setAttribute('src', 'Assets/' + (i + 1) + 'spades.png');
		}
	}
}
var score = 0;
var controls = document.getElementById('controls');
function checkToSubmit() {
	if (qindex == qlength - 1) {
		nextButton.remove();
		submit = document.createElement('button');
		controls.appendChild(submit);
		submit.id = 'submit';
		submit.innerText = 'Submit';
		submit.addEventListener('click', function () {
			calculateAttempts();
			cfm = confirm(
				'You have attemted ' +
					attempts +
					' of ' +
					qlength +
					'\nAre u sure wanna end the game?'
			);
			if (cfm == true) {
				evaluate();
			}
		});
	}
}
function evaluate() {
	setEvaluation();
	for (i = 0; i < qlength; i++) {
		if (info[i] == evaluation[i]) {
			score++;
		}
	}
	console.log(score);
}
function checkForNext() {
	if (qindex == qlength - 2) {
		submit = document.getElementById('submit');
		submit.remove();
		nextButton = document.createElement('button');
		controls.appendChild(nextButton);
		nextButton.id = 'nex';
		nextButton.classList.add('next');
		nextButton.innerText = 'Next Card';
		nextButton.addEventListener('click', showNext);
	}
}
function checkForPrev() {
	if (qindex == 1) {
		previousButton = document.createElement('button');
		controls.prepend(previousButton);
		previousButton.id = 'prev';
		previousButton.classList.add('previous');
		previousButton.innerText = 'Previous Card';
		previousButton.addEventListener('click', showPrev);
	} else if (qindex == 0) {
		previousButton.remove();
	}
}
