function LandingPage({ quizzes, dispatch }) {
	return (
		<div className="start p-4">
			<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
				Choose a Quiz
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
				{quizzes.map((quiz) => (
					<div
						key={quiz.id}
						className={`quiz-item ${
							!quiz.available ? "unavailable" : ""
						} flex flex-col`}
					>
						<div className="quiz-cover-container relative flex-grow">
							<img
								src={quiz.cover}
								alt={quiz.name}
								className="quiz-cover w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg cursor-pointer shadow-md transition-transform duration-300 hover:scale-105"
								onClick={() => {
									if (quiz.available) {
										dispatch({ type: "quizSelected", payload: quiz.id });
									}
								}}
							/>
							{!quiz.available && (
								<div className="unavailable-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
									<p className="unavailable-text text-white text-sm sm:text-base font-bold">
										Coming Soon
									</p>
								</div>
							)}
						</div>
						<p className="quiz-name mt-2 text-center text-sm sm:text-base font-semibold">
							{quiz.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default LandingPage;
