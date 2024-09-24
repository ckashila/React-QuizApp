function LandingPage({ quizzes, dispatch }) {
	return (
		<div className="start">
			<h2>Choose a Quiz</h2>
			<div className="quiz-list">
				{quizzes.map((quiz) => (
					<div
						key={quiz.id}
						className={`quiz-item ${!quiz.available ? "unavailable" : ""}`}
					>
						<div className="quiz-cover-container">
							<img
								src={quiz.cover} // Updated to use the full URL
								alt={quiz.name}
								className="quiz-cover"
								onClick={() => {
									if (quiz.available) {
										dispatch({ type: "quizSelected", payload: quiz.id });
									}
								}}
							/>
							{!quiz.available && (
								<div className="unavailable-overlay">
									<p className="unavailable-text">Coming Soon</p>
								</div>
							)}
						</div>
						<p className="quiz-name">{quiz.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default LandingPage;
