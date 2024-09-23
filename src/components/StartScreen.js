function StartScreen({ numQuestions, dispatch }) {
	return (
		<div className="start">
			<h2>Et vas enterar de tot ?</h2>
			<h3>{numQuestions} preguntes per posar a prova el teu coneixement</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "start" })}
			>
				Comencem!
			</button>
		</div>
	);
}

export default StartScreen;
