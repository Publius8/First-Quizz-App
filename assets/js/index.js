window.addEventListener("load", function () {
    // Скрыть спиннер
    document.getElementById("spinner").style.display = "none";

    // Показать основной контент
    document.getElementById("content").style.display = "block";
});
let Questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "F. Scott Fitzgerald", correct: false },
            { text: "Ernest Hemingway", correct: false }
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "HO", correct: false },
            { text: "H2O", correct: true },
            { text: "OH", correct: false },
            { text: "HHO", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false },
            { text: "Japan", correct: true }
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1910", correct: false },
            { text: "1912", correct: true },
            { text: "1914", correct: false },
            { text: "1916", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Great White Shark", correct: false },
            { text: "Giraffe", correct: false }
        ]
    }
];

const questionContainer = document.querySelector("#questionContainer");
const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");

let currentIndex = 0;

let score = 0;
let correcto = 0;
let wronger = 0;


const updateQuestions = (index) => {
    let randomIndex = Math.floor(Math.random() * Questions.length);
    let randomQuestion = Questions[randomIndex];

    let allContent = "";
    if (randomQuestion) {
        allContent += `
            <div class="btn-grid flexious">
                <p>${Questions[index].question}</p>
                ${Questions[index].answers.map(answer => `
                    <button data-correct="${answer.correct}" class="btn">${answer.text}</button>
                `).join('')}
            </div>
        `;
    }
    questionContainer.innerHTML = allContent;
    checkAnswer();
};

startBtn.addEventListener("click", () => {
    score = 0;
    correcto = 0;
    wronger=0;
    currentIndex = 0;
    updateQuestions(currentIndex);
    questionContainer.classList.remove("hide");
    startBtn.classList.add("hide");
});


const checkAnswer = () => {
    const answerButtons = document.querySelectorAll(".btn-grid .btn");

    const correctButton = Array.from(answerButtons).find(button => button.dataset.correct === "true");


    answerButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const correct = e.target.dataset.correct === "true";

            answerButtons.forEach(btn => btn.disabled = true);
            if (correct) {
                e.target.style.background = "green";
                correcto++;
                score++;
                setTimeout(() => nextQuestion(), 1000);
            } else {
                e.target.style.background = "red";
                wronger++;
                setTimeout(() => nextQuestion(), 1000);
            }
            if (correctButton) {
                correctButton.style.background = "green";
            }
        });
    });
};


const nextQuestion = () => {
    currentIndex += 1;
    if (currentIndex < Questions.length) {
        updateQuestions(currentIndex);
    } else {
        nextBtn.classList.add("hide");
        questionContainer.innerHTML = `
            <p style='font-size: 30px'>Finish</p>
            <p style='font-size: 30px'>Final Score: ${score}</p>
            <p style='font-size: 30px'>Correct: ${correcto}</p>
            <p style='font-size: 30px'>Wrong: ${wronger}</p>
        `;
    }
};



// e.target.dataset.correct help to reach custom attribute in html 
// data-correct="${answer.correct}" it is our custom attribute


// let a = [1,2,3,4,5,6];
// let m =  a.map( (value) => {
//     return value * 2;
// });
// console.log(m);

// let n = [1,2,3,4,5,6];
// let y = n.filter( (value) => {
//     return value > 4;
// });
// console.log(y);