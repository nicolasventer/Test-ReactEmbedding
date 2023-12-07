// @ts-check

/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="../dist/main.d.ts" />

// get functions defined in the react app
const { appendCounter, textComponent } = window;

// get html elements
const countersEl = document.getElementById("counters");
if (countersEl === null) throw new Error("counters element not found");
const addCounterButton = document.getElementById("add-counter");
if (addCounterButton === null) throw new Error("add-counter button not found");
const resetCountersButton = document.getElementById("reset-counters");
if (resetCountersButton === null) throw new Error("reset-counters button not found");

/** @type {import("../dist/Counter").CounterProps[]} */
const counterStates = [];

addCounterButton.addEventListener("click", () => counterStates.push(appendCounter(countersEl)));
resetCountersButton.addEventListener("click", () => counterStates.forEach((counterState) => counterState.setCount(0)));

// add sample counter
counterStates.push(appendCounter(countersEl));

// add sample text component
const { st, el } = textComponent();
document.body.appendChild(el);
const text = document.createTextNode("");
document.body.appendChild(text);
st.onTextChange = (newText) => (text.nodeValue = newText); // update text node when text changes
