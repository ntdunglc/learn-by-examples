<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import MultiplicationGrid from '../shared/MultiplicationGrid.svelte';

	export let maxFactor = 10;
	export let firstFactor = null;

	let factor1, factor2, correctAnswer;
	let options = [];
	let selectedAnswer = null;
	let message = '';
	let showMessage = false;
	let previousProblem = { factor1: null, factor2: null };

	function getRandomFactor(max) {
		const rand = Math.random();
		if (rand < 0.05) return 1; // 5% chance for 1
		if (rand > 0.95) return 10; // 5% chance for 10 (when max is 10)
		// Remaining 90% distributed among 2-9
		return Math.floor(rand * 8) + 2;
	}

	export function generateNewProblem() {
		let newFactor1, newFactor2;
		do {
			newFactor1 = firstFactor !== null ? firstFactor : getRandomFactor(maxFactor);
			newFactor2 = getRandomFactor(maxFactor);
		} while (newFactor1 === previousProblem.factor1 && newFactor2 === previousProblem.factor2);

		factor1 = newFactor1;
		factor2 = newFactor2;
		correctAnswer = factor1 * factor2;
		previousProblem = { factor1, factor2 };

		generateOptions();
		selectedAnswer = null;
		showMessage = false;
	}

	function generateOptions() {
		const optionSet = new Set([correctAnswer, factor1 + factor2]);
		while (optionSet.size < 6) {
			const randomFactor = getRandomFactor(maxFactor);
			const randomOption = randomFactor * (Math.random() < 0.5 ? factor1 : factor2);
			if (randomOption !== correctAnswer) {
				optionSet.add(randomOption);
			}
		}
		options = Array.from(optionSet).sort(() => Math.random() - 0.5);
	}

	function checkAnswer(answer) {
		selectedAnswer = answer;
		showMessage = true;
		if (answer === correctAnswer) {
			message = 'Correct! Well done!';
		} else {
			message = `Oops! The correct answer is ${correctAnswer}.`;
		}
	}

	onMount(generateNewProblem);
</script>

<div class="multiplication-container">
	<h2>Multiplication Problem</h2>

	<div class="problem">
		<span>{factor1} x {factor2} = ?</span>
	</div>

	<div class="visualization">
		<div class="factor factor1">
			<MultiplicationGrid rows={1} cols={factor1} />
		</div>
		<div class="multiply">x</div>
		<div class="factor factor2">
			<MultiplicationGrid rows={factor2} cols={1} />
		</div>
		<div class="equals">=</div>
		<div class="product">
			<MultiplicationGrid
				rows={factor2}
				cols={factor1}
				showSkipCounting={showMessage}
				horizontalFactor={factor2}
				verticalFactor={factor1}
			/>
		</div>
	</div>

	<div class="options">
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

	{#if showMessage}
		<div class="message" transition:fade>
			{message}
		</div>
		<button class="next-problem" on:click={generateNewProblem} transition:fly={{ y: 20 }}>
			Next Problem
		</button>
	{/if}
</div>

<style>
	.multiplication-container {
		font-family: 'Comic Sans MS', cursive, sans-serif;
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		background-color: #f0f8ff;
		border-radius: 15px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	h2 {
		text-align: center;
		color: #4a4a4a;
	}

	.problem {
		font-size: 24px;
		text-align: center;
		margin-bottom: 20px;
	}

	.visualization {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.factor,
	.product {
		display: flex;
		flex-direction: column;
	}

	.factor1 {
		flex-direction: row;
	}

	.multiply,
	.equals {
		font-size: 24px;
		margin: 0 10px;
	}

	.options {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;
	}

	button {
		padding: 10px 20px;
		font-size: 18px;
		background-color: #3498db;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition:
			transform 0.1s,
			background-color 0.3s;
	}

	button:hover {
		transform: scale(1.05);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.selected {
		transform: scale(1.1);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
