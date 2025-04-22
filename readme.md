# Quiz Creator – Question Interface & `view.js` Display Functions Documentation

This document explains the DOM utility functions provided in `view.js` for rendering quiz questions and options in the browser. These functions help you dynamically build quiz UIs with text, textboxes, radio buttons, and checkboxes.

## Abstract Question Interface
All question types in this project should follow the `AbstractQuestion` abstract base class:
```
AbstractQuestion {
  constructor(question: string, answer: any, score: number) {}
  render(): void;
  checkAnswer(answerObject: any): boolean;

}
```

- `text`, `answer`, and `score` are required properties.
- `render()` must display the question in the DOM (using display* functions).
- `checkAnswer(answerObject)` must check if the user's answer is correct and return a boolean.

## Function Reference

### 1. `displayText(text)`
**Description:**
- Displays a block of text in the quiz output area.
- Useful for showing question prompts or instructions.

**Parameters:**
- `text` (string): The text to display.

**Example:**
```js
displayText('What is the capital of France?');
```

---

### 2. `displayTextbox(label, value, name = null)`
**Description:**
- Displays a text input box with a label in the quiz output area.
- Useful for open-ended or short-answer questions.
- Optionally, you can assign a `name` to the input for easier retrieval.

**Parameters:**
- `label` (string): The label to show next to the textbox.
- `value` (string): The initial value of the textbox (usually empty string '').
- `name` (string, optional): The name attribute for the input (default is `null`).

**Examples:**
```js
// Basic usage
displayTextbox('Answer', '');

// With a name attribute
displayTextbox('Username', '', 'username');
```

---

### 3. `displayRadioButton(label, value, name)`
**Description:**
- Displays a radio button with a label in the quiz output area.
- Useful for multiple-choice questions where only one answer can be selected.

**Parameters:**
- `label` (string): The label to show next to the radio button.
- `value` (string): The value assigned to this option.
- `name` (string): The radio group name (all options for the same question should share the same name).

**Example:**
```js
displayRadioButton('Paris', 'Paris', 'mcq');
displayRadioButton('London', 'London', 'mcq');
displayRadioButton('Berlin', 'Berlin', 'mcq');
```

---

### 4. `displayCheckBox(label, value, name)`
**Description:**
- Displays a checkbox with a label in the quiz output area.
- Useful for questions where multiple answers can be selected (multi-select).

**Parameters:**
- `label` (string): The label to show next to the checkbox.
- `value` (string): The value assigned to this option.
- `name` (string): The checkbox group name (all options for the same question should share the same name).

**Example:**
```js
displayCheckBox('2', '2', 'multiselect');
displayCheckBox('3', '3', 'multiselect');
displayCheckBox('5', '5', 'multiselect');
displayCheckBox('7', '7', 'multiselect');
```

---

### 5. `clearDisplay()`
**Description:**
- Clears all content in the quiz output area (`#output`).
- Useful for resetting the UI before rendering a new question.

**Example:**
```js
clearDisplay();
```

---

## Notes
- All display functions add elements to the `#output` div in your HTML.
- Always call `clearDisplay()` before rendering a new question to avoid mixing UI elements.
- For radio and checkbox groups, use the same `name` for all options belonging to the same question.
