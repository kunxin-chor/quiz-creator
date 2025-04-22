// script.js - Quiz Runner
// Assumes Question class and view.js are loaded in global scope

// Sample questions (can be replaced)

let currentQuestionIndex = 0;
let score = 0;

function beginQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    clearDisplay();
    document.getElementById('result').textContent = '';
    beginQuestion();
}

function endQuiz() {
    clearDisplay();
    document.getElementById('result').textContent = `Quiz complete! Your score: ${score}/${questions.length}`;
}

function beginQuestion() {
    clearDisplay();
    if (currentQuestionIndex < questions.length) {
        questions[currentQuestionIndex].render();
        document.getElementById('result').textContent = '';
    }
}

function getAnswers() {
    const answerObject = {};
    // Get radio buttons
    const radios = document.querySelectorAll('#output input[type="radio"]');
    radios.forEach(radio => {
        if (radio.checked) {
            answerObject[radio.name] = radio.value;
        }
    });
    // Get checkboxes
    const checkboxes = document.querySelectorAll('#output input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (!answerObject[checkbox.name]) answerObject[checkbox.name] = [];
        if (checkbox.checked) {
            answerObject[checkbox.name].push(checkbox.value);
        }
    });
    // Get textboxes
    const textboxes = document.querySelectorAll('#output input[type="text"]');
    textboxes.forEach((textbox, i) => {
        // Use label if possible, else index
        let label = textbox.previousSibling && textbox.previousSibling.textContent ? textbox.previousSibling.textContent.trim() : `textbox${i}`;
        answerObject[label.replace(/\s/g, '')] = textbox.value;
        // For compatibility with single-answer questions
        answerObject['answer'] = textbox.value;
    });
    return answerObject;
}

function questionAnswered(isCorrect) {
    if (isCorrect) {
        document.getElementById('result').textContent = 'Correct!';
        score++;
    } else {
        document.getElementById('result').textContent = 'Incorrect.';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        beginQuestion();
    } else {
        endQuiz();
    }
}

// Wire up the submit button
document.getElementById('submitBtn').onclick = function() {
    if (currentQuestionIndex < questions.length) {
        const answerObject = getAnswers();
        const isCorrect = questions[currentQuestionIndex].checkAnswer(answerObject);
        questionAnswered(isCorrect);
        setTimeout(nextQuestion, 2000); // Wait 1s before next question
    } else {
        endQuiz();
    }
};

// Start the quiz on page load
document.addEventListener('DOMContentLoaded', beginQuiz);
