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

    }
    checkAnswer(answerObject) {
        return false;
    }
}

// TODO: populate this array with questions
const questions = [];