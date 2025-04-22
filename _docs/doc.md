```
class ShortAnswerQuestion extends AbstractQuestion {
    constructor(question, answer, score) {
        super(question, answer, score);
    }
    render() {
        displayText(this.question);
        displayTextbox('Answer', '', 'answer');
    }
    checkAnswer(answerObject) {
        return answerObject.answer === this.answer;
    }
}
```
* `ShortAnswerQuestion` extends `AbstractQuestion`: we create a new class named `ShortAnswerQuestion` that extends the `AbstractQuestion` class, meaning that it inherits all the properties and methods of the `AbstractQuestion` class.
* `constructor(question, answer, score)`: the constructor takes three parameters: `question`, `answer`, and `score`, which are passed to the constructor of the parent class `AbstractQuestion`.
* `render()`: the `render` method is implemented to display the question and a text input box for the user to enter their answer.
* `checkAnswer(answerObject)`: the `checkAnswer` method is implemented to check if the user's answer matches the correct answer.

One very important thing to take note is how when we call `displayTextbox` we pass the name `answer`. When we retrieve the user's answer from the `answerObject` in the `checkAnswer` method, we use the same name `answer` to access the value.