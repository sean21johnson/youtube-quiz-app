const scoreCorrect = document.getElementById("correct");
const totalQuestions = document.getElementById("total-questions");
const questionNumber = document.getElementById("question-number");
const form = document.getElementById("form");
const questionPrompt = document.getElementById("question");
const radioAnswers = document.getElementsByName("answer");
const answersEls = document.querySelectorAll('input[name="answers"]');
const questionsEl = document.getElementById("questions");
const tryAgain = document.getElementById("retry");

let currentQuestion = 1;
let totalRight = 0;

const questionsArr = [
	{
		questionNumber: 1,
		question: "Where does Dwight Schrute live?",
		possibleAnswers: ["Kansas", "Schrute Farm", "Milwaukee", "Pumpkin Farm"],
		answer: "Schrute Farm",
	},
	{
		questionNumber: 2,
		question: "Where did Ryan come from before Dunder Mifflin?",
		possibleAnswers: [
			"Dunder Mifflin Training Program",
			"Business School",
			"Temp Agency",
			"Google",
		],
		answer: "Temp Agency",
	},
	{
		questionNumber: 3,
		question: "Who is Jim Halpers wife?",
		possibleAnswers: ["Karen", "Pam", "Phyllis", "Michael"],
		answer: "Pam",
	},
	{
		questionNumber: 4,
		question: "Where is the Dunder Mifflin Pennsylvania branch located",
		possibleAnswers: ["Scranton", "Pittsburgh", "Philadelphia", "Harrison"],
		answer: "Scranton",
	},
	{
		questionNumber: 5,
		question: "What does Dwight grow on his farm?",
		possibleAnswers: ["Oranges", "Beets", "Celery", "Tomatoes"],
		answer: "Beets",
	},
];

// determine the total number of questions
function setNumberOfQuestions() {
	totalQuestions.innerText = questionsArr.length;
}

// set the value for the questions # we are on
function setQuestionNumber() {
	questionNumber.innerText = currentQuestion;
}

function updateScore() {
	scoreCorrect.innerText = totalRight;
}

// set question form display
function setFormAndQuestion() {
	// determine which index in the array we are on
	// can use the currentQuestion value and subtract by 1
	// then we need to manipulate the innerHTML of the form
	const currentQuestionIndex = currentQuestion - 1;
	const questionDetails = questionsArr[currentQuestionIndex];
	const theActualQuestion = questionDetails.question;
	const listOfAnswers = questionDetails.possibleAnswers;
	let listOfAnswersHTML = "";

    console.log('theActualQuestion', theActualQuestion)
    console.log('listOfAnswers', listOfAnswers)

	questionPrompt.innerText = theActualQuestion;

	listOfAnswers.map((item) => {
		return (listOfAnswersHTML += `<div class="radio_answer"><input type="radio" id="${item}" name="answers" value="${item}" >
        <label for="${item}">${item} </label></div>
        `);
	});

	form.innerHTML =
		listOfAnswersHTML += `<button class="submit submit_button">Submit</button>`;
}

function showResultsPage() {
	questionsEl.innerHTML = `<h3>Quiz Over</h3>
        <button id="retry" class="retry">Try Again</button>
    `;

	document.getElementById("retry").addEventListener("click", () => {
		totalRight = 0;
		currentQuestion = 1;

		questionsEl.innerHTML = `            <div>
        Question # <span class="question-number" id="question-number">1</span>
    </div>
    <div class="question" id="question">
    </div>
    <form class="form" id="form">
       
        <button class="submit">Submit</button>
    </form>`;

		getStarted();
	});
}

// update values when form submitted
function answerSubmit(e) {
	e.preventDefault();

	let selected = document.querySelector("input[name=answers]:checked").id;
	let theAnswer = questionsArr[currentQuestion - 1].answer;

	if (currentQuestion === questionsArr.length) {
		if (selected === theAnswer) {
			totalRight += 1;
			updateScore();
			showResultsPage();
		} else {
			updateScore();
			showResultsPage();
		}
	} else {
		if (selected === theAnswer) {
			totalRight += 1;
			currentQuestion++;
			updateScore();
			setQuestionNumber();
			setFormAndQuestion();
		} else {
			currentQuestion++;
			updateScore();
			setQuestionNumber();
			setFormAndQuestion();
		}
	}
}

// Get started on the quiz
function getStarted() {
	setNumberOfQuestions();
	setQuestionNumber();
	setFormAndQuestion();
	updateScore();
}

// Event Handlers
// Listen for when a user clicks on the submit button
// Once they click on the submit button, update the below:
//currentQuestion, totalRight
form.addEventListener("submit", answerSubmit);

getStarted();
