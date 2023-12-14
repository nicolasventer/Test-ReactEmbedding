# Test React Embedding

This project is a test of embedding a React component in a vanilla JS website.

*Inspiration: https://www.learningsomethingnew.com/embed-react-in-vanilla-js-website*

## Demo

![Showcase](misc/Showcase.gif)

## Features

- append a React component to a DOM element
- get and set state of React component
- pass parameters to React component
- lazy export of React component
- support for TypeScript and JavaScript with `@ts-check`
- export CSS

## Testing

Open [vanilla-website/index.html](vanilla-website/index.html) in a browser.

*Note: the folder [dist](dist) is not ignored by git so that no need to build before testing.*

## Installation

```bash
npm install
npm run build
```

You will have something like this:

![build](misc/build.png)

Update the path in [vanilla-website/index.html](vanilla-website/index.html) to the built file like this:

![html_import](misc/html_import.png)

## Some info

- `ReactDOM` require a root element. That's why we can only append components to a specified DOM element.  
  BE CAREFUL: the append not immediately done.
- the library [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts) is used to generate the `.d.ts` file.

## Code

<details>
<summary>Show React Code</summary>

Content of [src/Counter.tsx](src/Counter.tsx):

```tsx
import { useEffect, useState } from "react";

export type CounterProps = { count: number; setCount: (count: number) => void; onCountChange?: (count: number) => void };

export const Counter = (props: { state: CounterProps }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		props.state.count = count;
		props.state.setCount = setCount;
	}, [props.state, count]);
	useEffect(() => props.state.onCountChange?.(count), [props.state, count]);

	return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
};
```

Content of [src/ColorText.tsx](src/ColorText.tsx):

```tsx
import { useEffect, useRef, useState } from "react";

export type ColorTextProps = {
	ref: React.RefObject<HTMLInputElement>; // ref is not mandatory, be aware that this is the only way to get the DOM element
	text: string;
	setText: (text: string) => void;
	onTextChange?: (text: string) => void;
};

export const ColorText = (props: { state: ColorTextProps }) => {
	const [text, setText] = useState(props.state.text ?? "");
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		props.state.text = text;
		props.state.setText = setText;
		props.state.ref = ref;
	}, [props.state, text]);
	useEffect(() => props.state.onTextChange?.(text), [props.state, text]);
	return <input ref={ref} style={{ color: text }} type="text" value={text} onChange={(e) => setText(e.target.value)} />;
};
```

Content of [src/main.tsx](src/main.tsx):

```tsx
import { StrictMode, Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { ColorTextProps } from "./ColorText";
import { Counter, CounterProps } from "./Counter";
import "./index.css";

declare global {
	interface Window {
		appendCounter: (el: HTMLElement, props?: CounterProps) => CounterProps;
		appendColorText: (el: HTMLElement, props?: ColorTextProps) => ColorTextProps;
	}
}

/* Unfortunately, function below does not work.
const GetAppendFn =
	<T,>(component: (props: { state: T }) => React.ReactNode) =>
	(el: HTMLElement, props: T = {} as T) => {
		const child = document.createElement("span"); // whatever, since not rendered
		const root = createRoot(child);
		root.render(<StrictMode>{createPortal(component({ state: props }), el)}</StrictMode>);
		return props;
	};
*/

window.appendCounter = (el: HTMLElement, props: CounterProps = {} as CounterProps) => {
	const child = document.createElement("span"); // whatever, since not rendered
	const root = createRoot(child);
	root.render(<StrictMode>{createPortal(<Counter state={props} />, el)}</StrictMode>);
	return props;
};

// eslint-disable-next-line react-refresh/only-export-components
const ColorText = lazy(() => import("./ColorText").then((module) => ({ default: module.ColorText })));

// lazy loading example
window.appendColorText = (el: HTMLElement, props: ColorTextProps = {} as ColorTextProps) => {
	const child = document.createElement("span"); // whatever, since not rendered
	const root = createRoot(child);
	root.render(
		<StrictMode>
			{createPortal(
				<Suspense>
					<ColorText state={props} />
				</Suspense>,
				el
			)}
		</StrictMode>
	);
	return props;
};
```

</details>

Content of [vanilla-website/vanillaIndex.js](vanilla-website/vanillaIndex.js):

```js
// @ts-check

/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="../dist/main.d.ts" />

// get functions defined in the react app
const { appendCounter, appendColorText } = window;

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
const st = /** @type {import("../dist/ColorText").ColorTextProps} */ ({ text: "Hello World!" });
appendColorText(document.body, st); // Careful append not immediately done
const text = document.createTextNode("");
document.body.appendChild(text);
st.onTextChange = (newText) => {
	text.nodeValue = newText; // update text node when text changes
	if (newText === "delete") st.ref.current?.remove(); // just showing how to get dom element
};
```
