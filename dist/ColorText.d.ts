/// <reference types="react" />
export type ColorTextProps = {
    ref: React.RefObject<HTMLInputElement>;
    text: string;
    setText: (text: string) => void;
    onTextChange?: (text: string) => void;
};
export declare const ColorText: (props: {
    state: ColorTextProps;
}) => import("react/jsx-runtime").JSX.Element;
