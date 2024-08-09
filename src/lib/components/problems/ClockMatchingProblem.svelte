<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import AnalogClock from '../shared/AnalogClock.svelte';
	import DigitalClock from '../shared/DigitalClock.svelte';

	const dispatch = createEventDispatcher();

	export let problemType = 'matchAnalogToDigital'; // matchAnalogToDigital | matchDigitalToAnalog
	export let accuracy = 'hour'; // hour | halfHour | minute

	let correctHour;
	let correctMinute;
	let options = [];
	let message = '';
	let isCorrect = false;
	let revealAnswer = false;
	let selectedOption = null;

	function generateOptions(correctHour, correctMinute) {
		const correct = { hours: correctHour, minutes: correctMinute };
		const options = [correct];

		function timeDifference(time1, time2) {
			const minutes1 = time1.hours * 60 + time1.minutes;
			const minutes2 = time2.hours * 60 + time2.minutes;
			return Math.abs(minutes1 - minutes2);
		}

		function isValidOption(newOption) {
			return options.every((option) => timeDifference(newOption, option) >= 10);
		}

		while (options.length < 6) {
			let h, m;
			switch (accuracy) {
				case 'hour':
					h = Math.floor(Math.random() * 12);
					m = 0;
					break;
				case 'halfHour':
					h = Math.floor(Math.random() * 12);
					m = Math.floor(Math.random() * 2) * 30;
					break;
				case 'minute':
					h = Math.floor(Math.random() * 12);
					m = Math.floor(Math.random() * 60);
					break;
			}

			const newOption = { hours: h, minutes: m };

			if (
				isValidOption(newOption) &&
				!options.some((opt) => opt.hours === h && opt.minutes === m)
			) {
				options.push(newOption);
			}
		}

		return options.sort(() => Math.random() - 0.5);
	}

	export const generateNewProblem = () => {
		correctHour = Math.floor(Math.random() * 12);
		switch (accuracy) {
			case 'hour':
				correctMinute = 0;
				break;
			case 'halfHour':
				correctMinute = Math.floor(Math.random() * 2) * 30;
				break;
			case 'minute':
				correctMinute = Math.floor(Math.random() * 60);
				break;
		}
		options = generateOptions(correctHour, correctMinute);
		message = '';
		isCorrect = false;
		revealAnswer = false;
		selectedOption = null;
		dispatch('problemGenerated');
	};

	onMount(generateNewProblem);

	function checkAnswer(selected) {
		selectedOption = selected;
		isCorrect = selected.hours === correctHour && selected.minutes === correctMinute;
		revealAnswer = true;
		message = isCorrect
			? "Great job! That's correct!"
			: "Oops! That's not correct. Here's the right answer:";
	}

	function playAgain() {
		generateNewProblem();
	}

	$: prompt =
		problemType === 'matchDigitalToAnalog'
			? 'Choose the analog clock that matches this digital time:'
			: 'Match the analog clock to the correct digital time:';
</script>


<div class="clock-matching-container">
	<div class="main-area">
		<h2>{prompt}</h2>
		<div class="clock-area">
			{#if problemType === 'matchDigitalToAnalog'}
				<DigitalClock hours={correctHour} minutes={correctMinute} size="large" />
			{:else}
				<AnalogClock hours={correctHour} minutes={correctMinute} size={200} />
			{/if}
		</div>
		<div
			class="options-grid"
			class:analog={problemType === 'matchDigitalToAnalog'}
			class:digital={problemType === 'matchAnalogToDigital'}
		>
			{#each options as option, i}
				<button
					class="option-box"
					class:analog={problemType === 'matchDigitalToAnalog'}
					class:digital={problemType === 'matchAnalogToDigital'}
					class:selected={option === selectedOption}
					on:click={() => checkAnswer(option)}
					disabled={revealAnswer}
				>
					{#if problemType === 'matchDigitalToAnalog'}
						<AnalogClock hours={option.hours} minutes={option.minutes} size={150} />
					{:else}
						<DigitalClock hours={option.hours} minutes={option.minutes} size="medium" />
					{/if}
				</button>
			{/each}
		</div>
	</div>
	<div class="message-area">
		{#if message}
			<div class="message-container" transition:fade>
				<p class="message" class:correct={isCorrect} class:incorrect={!isCorrect}>
					{message}
				</p>
				{#if !isCorrect}
					<div class="correct-answer">
						{#if problemType === 'matchDigitalToAnalog'}
							<AnalogClock hours={correctHour} minutes={correctMinute} size={150} />
						{:else}
							<DigitalClock hours={correctHour} minutes={correctMinute} size="medium" />
						{/if}
					</div>
				{/if}
				<button class="play-again-button" on:click={playAgain}>Play Again! 🕰️</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.clock-matching-container {
		display: flex;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		box-sizing: border-box;
		font-family: 'Comic Sans MS', cursive, sans-serif;
	}

	.main-area {
		flex: 3;
		margin-right: 20px;
		display: flex;
		flex-direction: column;
	}

	.message-area {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h2 {
		text-align: center;
		color: #4a4a4a;
		font-size: 1.5em;
		margin-bottom: 15px;
	}

	.clock-area {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.options-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 15px;
		margin-top: 20px;
	}

	.options-grid.analog {
		grid-template-columns: repeat(3, 1fr);
	}

	.option-box {
		border: none;
		background-color: #4caf50;
		color: white;
		border-radius: 5px;
		cursor: pointer;
		transition:
			transform 0.1s,
			background-color 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
	}

	.option-box.analog {
		width: 150px;
		height: 150px;
		padding: 5px;
	}

	.option-box.digital {
		height: 60px;
	}

	.option-box.selected {
		background-color: #ffd700;
		transform: scale(1.05);
		box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
	}

	.option-box:hover {
		transform: scale(1.02);
		background-color: #45a049;
	}

	.option-box:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.option-box:disabled.selected {
		opacity: 1;
	}

	.message {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		margin: 0;
		padding: 15px;
		border-radius: 10px;
		width: 100%;
	}

	.correct {
		background-color: #4caf50;
		color: white;
	}

	.incorrect {
		background-color: #f44336;
		color: white;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.play-again-button {
		margin-top: 15px;
		padding: 10px 20px;
		font-size: 18px;
		background-color: #ff9800;
		color: white;
		border: none;
		border-radius: 25px;
		cursor: pointer;
		transition:
			background-color 0.3s,
			transform 0.1s;
	}

	.play-again-button:hover {
		background-color: #f57c00;
		transform: scale(1.05);
	}

	.play-again-button:active {
		transform: scale(0.95);
	}

	.correct-answer {
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
