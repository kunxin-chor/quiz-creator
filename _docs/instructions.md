# M4.1 Guided Instructions – Quiz Creator

## Preamble

In this guided instruction, we will use object-oriented programming (OOP) principles to develop a quiz system. We will explore how to use inheritance and method overriding to create a quiz that consists of different question types, such as text answer, MCQ, and multi-answer.

> **Note:** In JavaScript, using OOP is strictly optional as it is a loosely-typed language. However, the knowledge here will be important if you ever want to do OOP in a strongly-typed language, such as C++, Java, or TypeScript.

---

## 1.0 Setting Up

Fork the repository at [https://github.com/kunxin-chor/quiz-creator](https://github.com/kunxin-chor/quiz-creator)

---

## 2.0 Understanding the Code

There are a number of files in the repository, however the only one which we need to change is `question.js`.

When OOP is implemented correctly, we can achieve **separation of concerns**:
- `script.js` is responsible for beginning the quiz, showing a question, checking if a question is correct, and so on.
- `view.js` deals with rendering the UI and UX.

> You do **not** have to understand how `script.js` and `view.js` work to understand the quiz system. This allows work to be divided between different programmers with different skill levels and skill sets.

OOP is not the only method to achieve separation of concerns, but it is one of the most well-studied ones.

---

### 2.1 The Quiz API

API stands for **Application Programming Interface**. It is a library of functions exposed by a system to allow new content and features to be added.

> Do not confuse this with a RESTful API – API is a generic term which also includes RESTful APIs. We will learn more about the differences between them soon.

Read up on the various functions in `readme.md` at [https://github.com/kunxin-chor/quiz-creator](https://github.com/kunxin-chor/quiz-creator)

2.2 The Question Abstract Class
In OOP, an interface or abstract base class defines the expected variables and methods that a class should have. Most APIs will provide interfaces  so that developers would know how to create classes that will work with the system. Below is the abstract base class for a question:

AbstractQuestion {
  constructor(question: string, answer: any, score: number) {}
  render(): void;
  checkAnswer(answerObject: any): boolean;
}



The constructor defines what are the expected parameters. In this case, our own Question class would need to have a constructor that receives a question, answer and score parameter.
The render method does not receive any parameters. Its purpose is to display the question using the quiz system API (from 2.1)
The checkAnswer method receives an answer (which can be any type of data) and returns true if the answer is correct.

With all these in mind, let's see how we can implement questions for the quiz system!


3.0 Implementing the Questions
3.1 Basic Short Answer Question
The first kind of question we are going to implement is a short answer question.  Create a class named  ShortAnswerQuestion like so:
```
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
``


ShortAnswerQuestion extends AbstractQuestion: we create a new class named ShortAnswerQuestion that extends the AbstractQuestion class, meaning that it inherits all the properties and methods of the AbstractQuestion class.
constructor(question, answer, score): the constructor takes three parameters: question, answer, and score, which are passed to the constructor of the parent class AbstractQuestion.
render(): the render method is implemented to display the question and a text input box for the user to enter their answer.
checkAnswer(answerObject): the checkAnswer method is implemented to check if the user's answer matches the correct answer.

One very important thing to take note is how when we call displayTextbox we pass the name answer. When we retrieve the user's answer from the answerObject in the checkAnswer method, we use the same name `answer` to access the value.

Let's add to the question banks some sample questions:

const questions = [
    new ShortAnswerQuestion('What is 2+2?', '4', 1),
    new ShortAnswerQuestion('What is the capital of New Zealand?', 'Wellington', 1)
]


Now we can test our implementation by running index.html on our live server.


## 3.2 MCQ Question
Create a class named MCQQuestion like so:
```
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
```
Again, we extend `MCQQuestion` from `AbstractQuestion`, just for `ShortAnswerQuestion`. However, pay attention to the constructor. It recieves an additional parameter `options` which is an array of possible answers. In JavaScript OOP, it is possible to add new properties to a class by simply adding a new parameter to the constructor and then saving it as a property of the class.

The `render` method is also implemented differently from `ShortAnswerQuestion`. We display each option as a radio button with the name `mcq`. The `displayRadioButton` function has three parameters: `label`, `value`, and `name`. We want the `label` to be the same as the `value`, which is why we use `o` twice.

Finally, in `checkAnswer` we check if the value of the selected radio button (from `answerObject.mcq`) matches the correct answer. Remember, we use the `mcq` key this time round because we used `mcq` as the name of the radio buttons.

Let's add some sample questions:

const questions = [
    new MCQQuestion('Which ocean is the largest?', 'Atlantic', 1, ['Atlantic', 'Indian', 'Pacific', 'Arctic'])
]

## 3.3 Multi-select Questions
Finally, let's add a question which answer consists of one or more answers. Create a class named `MultiSelectQuestion` like so:
```
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
```

Let's add some sample questions:
```
const questions = [
    new MultiAnswerQuestion('Which of the following are fruits?', ['Apple', 'Orange'], 1, ['Apple', 'Carrot', 'Orange', 'Potato'])
]
```

While the `render` method has more or less the same implementation as `MCQQuestion`, the `checkAnswer` method is different. As both the correct answer and the provided answer are arrays, we will have to check if the user's answer is correct by comparing the two arrays. We do so by:
* Initialize a counter to 0
* For each answer in the user's answer, check if it is in the correct answer
* If it is, increment the counter
* If it is not, return false -- this is because the user's answer would already include an incorrect answer
* Return true if the counter is equal to the length of the correct answer -- this is because the user's answer must include all of the correct answers and ONLY the correct answers

# 4.0 Challenges
Try to implement the following types of questions

## 4.1: Fill in the Blank Question Type
Try to create a `FillInTheBlankQuestion` class that extends `AbstractQuestion`. The question will feature at least 1 blank, and up to any number of blanks. For each blank there is, display a textbox for the user to fill in their answer.

