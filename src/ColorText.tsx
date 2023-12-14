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
