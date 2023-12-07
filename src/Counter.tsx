import React, { useState } from "react";

export type CounterProps = { count: number; setCount: (count: number) => void; onCountChange?: (count: number) => void };

export const Counter = (props: { state: CounterProps }) => {
	const [count, setCount] = useState(0);
	React.useEffect(() => {
		props.state.count = count;
		props.state.setCount = setCount;
		props.state.onCountChange?.(count);
	}, [props.state, count]);
	return <button onClick={() => setCount(count + 1)}>count is {count}</button>;
};
