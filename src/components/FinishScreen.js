function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
	const percentage = (points / maxPossiblePoints) * 100;

	let emoji;
	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🎉";
	if (percentage >= 50 && percentage < 80) emoji = "🙃";
	if (percentage >= 0 && percentage < 50) emoji = "🤨";
	if (percentage === 0) emoji = "🤦‍♂️";

	return (
		<div className="result_container">
			<p className="result">
				<span>{emoji}</span> Has tret <strong>{points}</strong> punts de{" "}
				{maxPossiblePoints} ({Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Puntuació més alta: {highscore} punts)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restart" })}
			>
				Torna-ho a provar.
			</button>
		</div>
	);
}

export default FinishScreen;
