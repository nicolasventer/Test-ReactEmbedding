import { CounterProps } from "./Counter";
import { ColorTextProps } from "./ColorText";
declare global {
    interface Window {
        appendCounter: (el: HTMLElement) => CounterProps;
        textComponent: () => {
            el: HTMLElement;
            st: ColorTextProps;
        };
    }
}
