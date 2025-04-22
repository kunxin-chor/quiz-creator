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

class MCQQuestion extends Question {
    constructor(text, options, answer, score) {
        super(text, answer, score);
        this.options = options; // Array of {label, value}
    }
    render() {
        clearDisplay();
        displayText(this.text);
        this.options.forEach(opt => {
            displayRadioButton(opt.label, opt.value, 'mcq');
        });
    }
    checkAnswer(answerObject) {
        // The radio button group is named 'mcq'
        return answerObject['mcq'] === this.answer;
    }
}

class MultiSelectQuestion extends Question {
    constructor(text, options, answers, score) {
        super(text, answers, score);
        this.options = options; // Array of {label, value}
    }
    render() {
        clearDisplay();
        displayText(this.text);
        this.options.forEach(opt => {
            displayCheckBox(opt.label, opt.value, 'multiselect');
        });
    }
    checkAnswer(answerObject) {
        // answerObject['multiselect'] is an array of selected values
        if (!Array.isArray(answerObject['multiselect'])) return false;
        const selected = [...answerObject['multiselect']].sort();
        const correct = [...this.answer].sort();
        return selected.length === correct.length && selected.every((v, i) => v === correct[i]);
    }
}