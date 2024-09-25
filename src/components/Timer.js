import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: "tick" });
			}, 1000);

			return () => clearInterval(id);
		},
		[dispatch]
	);

	const handleAddTime = () => {
		dispatch({ type: "addTime", payload: 60 }); // Add 60 seconds (1 minute)
	};

	return (
		<div className="timer">
			<div>
				{mins < 10 && "0"}
				{mins}:{seconds < 10 && "0"}
				{seconds}
			</div>
			<button onClick={handleAddTime} className="btn btn-add-time">
				+1:00
			</button>
		</div>
	);
}

export default Timer;
