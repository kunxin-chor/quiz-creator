// view.js - DOM display utilities for quiz-creator
// All functions are globally scoped (no export)

function displayText(text) {
    const output = document.getElementById('output');
    const div = document.createElement('div');
    div.textContent = text;
    output.appendChild(div);
}

function displayRadioButton(label, value, name) {
    const output = document.getElementById('output');
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    const lbl = document.createElement('label');
    lbl.appendChild(input);
    lbl.appendChild(document.createTextNode(' ' + label));
    wrapper.appendChild(lbl);
    output.appendChild(wrapper);
}

function displayCheckBox(label, value, name) {
    const output = document.getElementById('output');
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.value = value;
    const lbl = document.createElement('label');
    lbl.appendChild(input);
    lbl.appendChild(document.createTextNode(' ' + label));
    wrapper.appendChild(lbl);
    output.appendChild(wrapper);
}

function displayTextbox(label, value, name = null) {
    const output = document.getElementById('output');
    const wrapper = document.createElement('div');
    const lbl = document.createElement('label');
    lbl.textContent = label + ' ';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value || '';
    if (name) input.name = name;
    wrapper.appendChild(lbl);
    wrapper.appendChild(input);
    output.appendChild(wrapper);
}

function clearDisplay() {
    const output = document.getElementById('output');
    output.innerHTML = '';
}
