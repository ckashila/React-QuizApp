import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import LandingPage from "./LandingPage";
import "../index.css";

const SECS_PER_QUESTION = 5;
const NUM_QUESTIONS = 15;

const initialState = {
	quizzes: [
		{
			id: "ElCaminoDeLosReyes",
			name: "El Camino de los Reyes",
			url: "https://ckashila.github.io/QuizQuestions/WayOfKings.json",
			cover: "camino1.jpg",
			available: true,
		},
		{
			id: "PalabrasRadiantes",
			name: "Palabras Radiantes",
			url: "https://example.com/harryPotter.json",
			cover: "palabras2.jpg",
			available: false,
		},
		{
			id: "Juramentada",
			name: "Juramentada",
			url: "https://ckashila.github.io/QuizQuestions/WayOfKings.json",
			cover: "juramentada3.png",
			available: false,
		},
		{
			id: "ElRitmoDeLaGuerra",
			name: "Harry Potter",
			url: "https://example.com/harryPotter.json",
			cover: "ritmo4.jpg",
			available: false,
		},
		{
			id: "VientoYVerdad",
			name: "Viento y Verdad",
			url: "https://ckashila.github.io/QuizQuestions/WayOfKings.json",
			cover: "viento5.jpg",
			available: false,
		},
	],
	selectedQuiz: null,
	questions: [],
	status: "landing",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "quizSelected":
			return {
				...state,
				selectedQuiz: action.payload,
				status: "loading",
			};
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restart":
			return { ...initialState, quizzes: state.quizzes, status: "landing" };
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				highscore:
					state.secondsRemaining === 0
						? state.points > state.highscore
							? state.points
							: state.highscore
						: state.highscore,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [
		{
			quizzes,
			selectedQuiz,
			questions,
			status,
			index,
			answer,
			points,
			highscore,
			secondsRemaining,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	useEffect(() => {
		if (selectedQuiz) {
			const selectedQuizData = quizzes.find((quiz) => quiz.id === selectedQuiz);
			fetch(selectedQuizData.url)
				.then((res) => res.json())
				.then((data) => {
					const allQuestions = data["questions"];
					const randomQuestions = getRandomQuestions(
						allQuestions,
						NUM_QUESTIONS
					);
					dispatch({
						type: "dataReceived",
						payload: randomQuestions,
					});
				})
				.catch((err) => dispatch({ type: "dataFailed" }));
		}
	}, [selectedQuiz, quizzes]);

	return (
		<div className="wrapper">
			<div className="app">
				<Header />
				<Main status={status} numQuestions={numQuestions} dispatch={dispatch}>
					{status === "landing" && (
						<LandingPage quizzes={quizzes} dispatch={dispatch} />
					)}
					{status === "loading" && <Loader />}
					{status === "error" && <Error />}
					{status === "ready" && (
						<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
					)}
					{status === "active" && (
						<>
							<Progress
								index={index}
								numQuestions={numQuestions}
								points={points}
								maxPossiblePoints={maxPossiblePoints}
								answer={answer}
							/>
							<Question
								question={questions[index]}
								dispatch={dispatch}
								answer={answer}
							/>
							<Footer>
								<Timer
									dispatch={dispatch}
									secondsRemaining={secondsRemaining}
								/>
								<NextButton
									dispatch={dispatch}
									answer={answer}
									numQuestions={numQuestions}
									index={index}
								/>
							</Footer>
						</>
					)}
					{status === "finished" && (
						<FinishScreen
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							highscore={highscore}
							dispatch={dispatch}
						/>
					)}
				</Main>
			</div>
		</div>
	);
}

function getRandomQuestions(questions, num) {
	const shuffled = [...questions].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, num);
}
