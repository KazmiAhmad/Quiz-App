const startbtnDisplay = document.getElementsByClassName("container-1")[0];
const ruleDisplay = document.getElementsByClassName("container-2")[0];
const questionDisplay = document.getElementsByClassName("container-3")[0];
const resultDisplay = document.getElementsByClassName("container-4")[0];
const startBtn = document.getElementById("start-btn");
const exitBtn = document.getElementById("exit-btn");
const continueBtn = document.getElementById("continue-btn");

const nextBtn = document.getElementById("next-btn");
const quitBtn = document.getElementById("quit-btn");
const replayBtn = document.getElementById("replay-btn");
const questionContainer = document.getElementById("question");
const progressBar = document.getElementById("progress");
const timerdata = document.getElementById("timerValue");
const questionCount = document.getElementById("question-count");
const resultData = document.getElementById("result");
let timeInterval;
let timeIntervalValue;
let correctAnswer = 0;
let questionNumber = 0;
let item;
let optionSelected = false;

let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
];

startbtnDisplay.style.display = "flex";

startBtn.addEventListener("click", () => {
  correctAnswer = 0;
  questionNumber = 0;
  startbtnDisplay.style.display = "none";
  ruleDisplay.style.display = "flex";
  ruleDisplay.style.backgroundcolor = "white";
});

exitBtn.addEventListener("click", () => {
  startbtnDisplay.style.display = "flex";
  ruleDisplay.style.display = "none";
});

function timer() {
  timeInterval = setInterval(() => {
    progressBar.value = progressBar.value + 0.01;
    if (progressBar.value >= 15) {
      answerHighlighter();
      clearInterval(timeInterval);
      enableNext();
    }
  }, 10);
  progressBar.value = 0;
}

function timerValue() {
  timerdata.innerText = 15;
  timeIntervalValue = setInterval(() => {
    let val = parseInt(timerdata.innerText);
    // console.log(val);
    timerdata.innerText = parseInt(timerdata.innerText) - 1;
    if (val < 2) {
      clearInterval(timeIntervalValue);
    }
  }, 1000);
}

continueBtn.addEventListener("click", question);
nextBtn.addEventListener("click", question);

quitBtn.addEventListener("click", () => {
  resultDisplay.style.display = "none";
  startbtnDisplay.style.display = "flex";
});

replayBtn.addEventListener("click", () => {
  correctAnswer = 0;
  questionNumber = 0;
  question();
  resultDisplay.style.display = "none";
  questionDisplay.style.display = "flex";
});

function question() {
  questionDisplay.style.display = "flex";
  ruleDisplay.style.display = "none";
  nextBtn.style.display = "none";
  // continueBtn.style.display = "none";

  if (questionNumber < 5) {
    while (questionContainer.hasChildNodes()) {
      questionContainer.removeChild(questionContainer.firstChild);
    }

    item = questions[questionNumber];

    const h2 = document.createElement("h2");
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    h2.innerText = `${item.numb}.${item.question}`;
    questionContainer.appendChild(h2);
    questionContainer.appendChild(optionsDiv);

    item.options.map((options) => {
      const input = document.createElement("input");
      input.value = options;
      input.className = "option";
      input.setAttribute("disabled", "true");
      optionsDiv.appendChild(input);
    });
    questionCount.innerText = `${questionNumber + 1} of 5 questions`;

    questionNumber += 1;

    timer();
    timerValue();
    checkWin(item.answer, optionsDiv);
  } else {
    questionDisplay.style.display = "none";
    resultDisplay.style.display = "flex";
    resultData.innerText = `and congrats! 🎉, You got ${correctAnswer} out of 5`;
    // console.log(`${correctAnswer} Correct Answer out of 5`);
  }
}

function checkWin(answer, optionsContainer) {
  optionSelected = false;
  optionsContainer.addEventListener("click", (event) => {
    console.log("selected");
    if (!optionSelected) {
      optionSelected = true;
      if (event.target.value === answer) {
        event.target.setAttribute("class", "correct");
        correctAnswer += 1;
        clearInterval(timeInterval);
        clearInterval(timeIntervalValue);
        enableNext();
        // optionsContainer.removeEventListener("click", checkWin);
      } else {
        event.target.setAttribute("class", "incorrect");

        answerHighlighter();
        clearInterval(timeInterval);
        clearInterval(timeIntervalValue);
        enableNext();
      }
    }
  });
}

function answerHighlighter() {
  for (let i = 0; i < 4; i++) {
    if (document.getElementsByClassName("option")[i].value === item.answer) {
      document
        .getElementsByClassName("option")
        [i].setAttribute("class", "correct");
      return;
    }
  }
}

function enableNext() {
  nextBtn.style.display = "inline-block";
}
