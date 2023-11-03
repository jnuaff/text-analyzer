import { useState } from "react";
import "./App.css";

const ProgressBar = ({ progressBarWidth }: { progressBarWidth: number }) => {
	return (
		<div className="progress-bar__container">
			<div className="progress-bar__info" style={{ width: `${progressBarWidth}%` }}></div>
			<span className="progress-bar__span">{Math.floor(progressBarWidth)}%</span>
			{Math.floor(progressBarWidth) > 99 && <span>Congrats! You've reached 50 words!!</span>}
		</div>
	);
};

const App = () => {
	const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
	const [userInput, setUserInput] = useState<string[]>([]);
	const characters: number = userInput.join().replaceAll(",", "").length;
	const words: number = userInput.length > 0 ? userInput[0].split(" ").length : 0;
	const sentences: number = userInput.length > 0 ? userInput[0].split(".").length : 0;
	const paragraphs: number = userInput.length > 0 ? userInput[0].split("\n").length : 0;
	const numberString =
		userInput.length > 0
			? userInput[0].split(/[ \n]/).reduce((acc, curr) => {
					if (curr.length > acc.length) {
						return curr; // if longest is grater than the nex element in array.
					} else {
						return acc; // new element of array is grater than current.
					}
			  }, "")
			: "";
	const updateUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUserInput(() => [event.target.value]);
		const calc = (words / 50) * 100;
		if (calc > 101) {
			return;
		}
		setProgressBarWidth(calc);
	};

	const paragraphHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.code === "Enter") {
			setUserInput((prevUserInput) => [...prevUserInput]);
		}
	};

	return (
		<main>
			<section className="home">
				<header className="navbar">
					<h1 className="navbar__title">Text Analizer</h1>
				</header>
				<div className="user-input">
					<ul className="user-input__info">
						<li>
							Words<p>{words}</p>
						</li>
						<li>
							Characters<p>{characters}</p>
						</li>
						<li>
							Sentences<p>{sentences}</p>
						</li>
						<li>
							Paragraphs<p>{paragraphs}</p>
						</li>
					</ul>
					<textarea className="user-input__input" onChange={updateUserInput} onKeyDown={paragraphHandler} />
					<span className="user-input__data">
						Longest Word <br></br><span>{numberString === "" ? "No Words Found" : numberString}</span>
					</span>
					<ProgressBar progressBarWidth={progressBarWidth} />
				</div>
			</section>
		</main>
	);
};

export default App;
