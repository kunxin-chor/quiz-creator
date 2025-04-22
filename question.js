class Question {
    constructor(text, answer, score) {
        this.text = text;
        this.answer = answer;
        this.score = score;
    }
    checkAnswer(answerObject) {
        return answerObject.answer === this.answer;
    }
    render() {
        displayText(this.text);
        displayTextbox('Answer', '');
    }
}

const questions = [
    new Question('What is 2 + 2?', '4', 1),
    new Question('What is the capital of France?', 'Paris', 1)
]
