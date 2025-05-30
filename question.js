/**
 * @abstract AbstractQuestion
 * @description Abstract interface for all question types.
 * @constructor text, answer, score
 * @method render() - Render the question in the DOM
 * @method checkAnswer(answerObject) - Check if a user's answer is correct
 */

class AbstractQuestion {
    constructor(question, answer, score) {
        this.question = question;
        this.answer = answer;
        this.score = score;
    }
    render() {
        displayText(this.question);
        displayTextbox('Answer', '');
    }

    checkAnswer(answerObject) {
        return false;
    }
}

class ShortAnswerQuestion extends AbstractQuestion {
    constructor(question, answer, score) {
        super(question, answer, score);
    }
    render() {
        displayText(this.question);
        displayTextbox('Answer', '');
    }
    checkAnswer(answerObject) {
        return answerObject.answer === this.answer;
    }
}

class MCQQuestion extends AbstractQuestion {
    constructor(question, answer, score, options) {
        super(question, answer, score);
        this.options = options;
    }
    render() {
        displayText(this.question);
        console.log(this.options)
        // display each option in a radio buttion, with the name `mcq` 
        for (let o of this.options) {
            displayRadioButton(o, o, 'mcq');
        }
    }
    checkAnswer(answerObject) {
        return answerObject.mcq === this.answer;
    }
}

class MultiAnswerQuestion extends AbstractQuestion {
    constructor(question, answer, score, options) {
        super(question, answer, score);
        this.options = options;
    }
    render() {
        displayText(this.question);
        console.log(this.options)
        // display each option in a checkbox, with the name `mcq` 
        for (let o of this.options) {
            displayCheckBox(o, o, 'multiselect');
        }
    }
    checkAnswer(answerObject) {
        const answerArray = answerObject.multiselect;
        // the user's answer must include all of the correct answers and ONLY the correct answers
        let correctAnswerCount = 0;
        for (let a of answerArray) {
            if (this.answer.includes(a)) {
                correctAnswerCount++;
            } else {    
                return false;
            }
        }
        return correctAnswerCount === this.answer.length;
    }
}

const questions = [
    // new ShortAnswerQuestion('What is 2+2?', '4', 1),
    // new ShortAnswerQuestion('What is the capital of New Zealand?', 'Wellington', 1),
    // new MCQQuestion('Which ocean is the largest?', 'Atlantic', 1, ['Atlantic', 'Indian', 'Pacific', 'Arctic']),
    new MultiAnswerQuestion('Which of the following are fruits?', ['Apple', 'Orange' ], 1, ['Apple', 'Carrot', 'Orange', 'Potato'])
]