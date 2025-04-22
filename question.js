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