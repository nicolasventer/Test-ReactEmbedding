export type CounterProps = {
    count: number;
    setCount: (count: number) => void;
    onCountChange?: (count: number) => void;
};
export declare const Counter: (props: {
    state: CounterProps;
}) => import("react/jsx-runtime").JSX.Element;
