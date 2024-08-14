<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import StackingBlocks from '../shared/StackingBlocks.svelte';
	import SmallNumberBlocks from '../shared/SmallNumberBlocks.svelte';

	export let maxNumber = 999;
	export let minNumber = 0;
	export let regrouping = true;

	let minuend, subtrahend, correctAnswer;
	let options = [];
	let selectedAnswer = null;
	let message = '';
	let showMessage = false;
	let highlightNumber = -1;

	function getRandomNumber(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	function isEasyProblem(m, s) {
		return m === s || m <= 1 || s <= 1;
	}

	export function generateNewProblem() {
		let attempts = 0;
		const maxAttempts = 5; // Adjust this to control the balance between easy and normal problems

		do {
			minuend = getRandomNumber(minNumber, maxNumber);

			if (regrouping) {
				// Generate a subtrahend that may require regrouping
				subtrahend = getRandomNumber(minNumber, minuend);
			} else {
				// Generate a subtrahend that doesn't require regrouping
				let minuendHundreds = Math.floor(minuend / 100);
				let minuendTens = Math.floor((minuend % 100) / 10);
				let minuendOnes = minuend % 10;

				let subtrahendHundreds = getRandomNumber(0, minuendHundreds);
				let subtrahendTens = getRandomNumber(0, minuendTens);
				let subtrahendOnes = getRandomNumber(0, minuendOnes);

				subtrahend = subtrahendHundreds * 100 + subtrahendTens * 10 + subtrahendOnes;
			}

			attempts++;
		} while (isEasyProblem(minuend, subtrahend) && attempts < maxAttempts);

		console.log(minuend, subtrahend);

		correctAnswer = minuend - subtrahend;

		generateOptions();
		selectedAnswer = null;
		showMessage = false;
		highlightNumber = -1;
	}

	function generateOptions() {
		const optionSet = new Set([correctAnswer]);
		const optionCount = Math.min(5, maxNumber - minNumber);

		// Add the sum of minuend and subtrahend if it's within range
		const sumOption = minuend + subtrahend;
		if (sumOption <= maxNumber) {
			optionSet.add(sumOption);
		}

		// Add an option with the same ones digit as the correct answer
		const sameOnesOption =
			getRandomNumber(0, Math.floor(correctAnswer / 10)) * 10 + (correctAnswer % 10);
		if (sameOnesOption >= 0 && sameOnesOption <= maxNumber && sameOnesOption !== sumOption) {
			optionSet.add(sameOnesOption);
		}

		// Generate other random options
		const diff = Math.max(Math.floor(correctAnswer * 0.1), optionCount);
		while (optionSet.size < optionCount) {
			const randomOption = correctAnswer + getRandomNumber(-diff, diff);
			if (randomOption >= 0 && randomOption <= maxNumber) {
				optionSet.add(randomOption);
			}
		}

		options = Array.from(optionSet).sort((a, b) => a - b);
	}

	function checkAnswer(answer) {
		selectedAnswer = answer;
		showMessage = true;
		highlightNumber = subtrahend;
		if (answer === correctAnswer) {
			message = 'Correct! Great job!';
		} else {
			message = `Not quite. The correct answer is ${correctAnswer}. Let's try another problem!`;
		}
	}

	onMount(generateNewProblem);
</script>

<div class="subtraction-container">
	<h2>Solve the subtraction problem:</h2>

	<div class="problem">
		<span>{minuend} - {subtrahend} = ?</span>
	</div>

	<div class="visualization">
		<div class="number-block">
			{#if selectedAnswer !== null}
				<h3 class="green-text">{correctAnswer} green squares</h3>
			{:else}
				<h3>{minuend} squares</h3>
			{/if}
			{#if maxNumber <= 20}
				<SmallNumberBlocks number={minuend} {highlightNumber} />
			{:else}
				<StackingBlocks
					number={minuend}
					otherNumber={subtrahend}
					{highlightNumber}
					squareStyle={maxNumber <= 99 ? 'large' : 'small'}
				/>
			{/if}
		</div>
		<div class="number-block">
			{#if selectedAnswer !== null}
				<h3>0 green square</h3>
			{:else}
				<h3>{subtrahend} squares</h3>
			{/if}
			{#if maxNumber <= 20}
				<SmallNumberBlocks number={subtrahend} {highlightNumber} />
			{:else}
				<StackingBlocks
					number={subtrahend}
					otherNumber={minuend}
					{highlightNumber}
					squareStyle={maxNumber <= 99 ? 'large' : 'small'}
				/>
			{/if}
		</div>
	</div>

	<div class="answer-section">
		<label for="options">Choose an answer:</label>
		<div class="options" id="options">
			{#each options as option}
				<button
					class:selected={selectedAnswer === option}
					class:correct={showMessage && option === correctAnswer}
					class:incorrect={showMessage && selectedAnswer === option && option !== correctAnswer}
					on:click={() => checkAnswer(option)}
					disabled={showMessage}
				>
					{option}
				</button>
			{/each}
		</div>
	</div>

	{#if showMessage}
		<div class="message">
			{message}
		</div>
		<button class="next-problem" on:click={generateNewProblem}> Next Problem </button>
	{/if}
</div>

<style>
	.subtraction-container {
		font-family: 'Comic Sans MS', cursive, sans-serif;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background-color: #f0f8ff;
		border-radius: 15px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	h2,
	h3 {
		text-align: center;
		color: #4a4a4a;
	}
	h3.green-text {
		color: #2ecc71;
	}

	.problem {
		font-size: 24px;
		text-align: center;
		margin-bottom: 20px;
	}

	.visualization {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.number-block {
		text-align: center;
		width: 48%;
	}

	.answer-section {
		margin-top: 20px;
		text-align: center;
	}

	.answer-section label {
		display: block;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: bold;
		color: #4a4a4a;
	}

	.options {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	button {
		padding: 10px 20px;
		font-size: 18px;
		background-color: #3498db;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #2980b9;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.selected {
		border: 2px solid #2c3e50;
	}

	.correct {
		background-color: #2ecc71;
	}

	.incorrect {
		background-color: #e74c3c;
	}

	.message {
		text-align: center;
		font-size: 20px;
		margin-top: 20px;
		font-weight: bold;
	}

	.next-problem {
		display: block;
		margin: 20px auto 0;
		background-color: #f39c12;
	}
</style>
