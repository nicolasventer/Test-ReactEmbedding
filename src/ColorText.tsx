import React, { useState } from "react";

export type ColorTextProps = { text: string; setText: (text: string) => void; onTextChange?: (text: string) => void };

export const ColorText = (props: { state: ColorTextProps }) => {
	const [text, setText] = useState("");
	React.useEffect(() => {
		props.state.text = text;
		props.state.setText = setText;
		props.state.onTextChange?.(text);
	}, [props.state, text]);
	return <input style={{ color: text }} type="text" value={text} onChange={(e) => setText(e.target.value)} />;
};
