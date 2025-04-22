/**
 * @abstract AbstractQuestion
 * @description Abstract interface for all question types.
 * @constructor text, answer, score
 * @method render() - Render the question in the DOM
 * @method checkAnswer(answerObject) - Check if a user's answer is correct
 */

class AbstractQuestion {
    constructor(question, answer, score) {

    }
    render() {

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