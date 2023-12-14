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
