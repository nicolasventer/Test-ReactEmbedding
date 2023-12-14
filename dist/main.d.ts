import { ColorTextProps } from "./ColorText";
import { CounterProps } from "./Counter";
declare global {
    interface Window {
        appendCounter: (el: HTMLElement, props?: CounterProps) => CounterProps;
        appendColorText: (el: HTMLElement, props?: ColorTextProps) => ColorTextProps;
        appendCounter2: (el: HTMLElement, props?: CounterProps) => CounterProps;
    }
}
