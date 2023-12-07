import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Counter, CounterProps } from "./Counter";
import { ColorTextProps } from "./ColorText";

declare global {
	interface Window {
		appendCounter: (el: HTMLElement) => CounterProps;
		textComponent: () => { el: HTMLElement; st: ColorTextProps };
	}
}

window.appendCounter = (el: HTMLElement) => {
	// uncomment for lazy loading
	// const Counter = React.lazy(() => import("./Counter").then((module) => ({ default: module.Counter })));
	const child = document.createElement("span");
	const root = ReactDOM.createRoot(child);
	const state = {} as CounterProps; // state initialized in Counter
	root.render(
		<React.StrictMode>
			{/* React.Suspense now not needed since lazy loading is commented out */}
			<Counter state={state} />
		</React.StrictMode>
	);
	el.appendChild(child);
	return state;
};

window.textComponent = () => {
	const ColorText = React.lazy(() => import("./ColorText").then((module) => ({ default: module.ColorText })));
	const el = document.createElement("span");
	const st = {} as ColorTextProps; // state initialized in ColorText
	const root = ReactDOM.createRoot(el);
	root.render(
		<React.StrictMode>
			<React.Suspense>
				<ColorText state={st} />
			</React.Suspense>
		</React.StrictMode>
	);
	return { el, st };
};
