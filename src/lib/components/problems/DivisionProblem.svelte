<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let maxQuotient = 10;
	export let maxDivisor = 10;
	export let allowRemainder = false;
	export let fixedDivisor = null;

	let dividend, divisor, correctAnswer, remainder;
	let options = [];
	let selectedAnswer = null;
	let title = '';
	let message = '';
	let showMessage = false;
	let showAnswer = false;
	let itemEmoji;
	let dividendItems = [];
	let divisorGroups = [];
	let dividendContainerHeight = '120px';

	// Add a variable to store the previous problem's parameters
	let previousProblem = { divisor: null, correctAnswer: null, remainder: null };

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getItemEmoji() {
		const emojis = ['🍪', '🍎', '🚀', '🎈', '🔵'];
		return emojis[Math.floor(Math.random() * emojis.length)];
	}

	function generateUniqueParameters() {
		let newDivisor, newCorrectAnswer, newRemainder;
		do {
			newDivisor =
				fixedDivisor !== null ? fixedDivisor : getRandomNumber(2, Math.min(maxDivisor, 10));
			newCorrectAnswer = getRandomNumber(1, maxQuotient);
			newRemainder = 0;

			if (allowRemainder && Math.random() < 0.3) {
				newRemainder = getRandomNumber(1, newDivisor - 1);
			}
		} while (
			newDivisor === previousProblem.divisor &&
			newCorrectAnswer === previousProblem.correctAnswer &&
			newRemainder === previousProblem.remainder
		);

		return { newDivisor, newCorrectAnswer, newRemainder };
	}

    function getTitle() {
        if (allowRemainder) {
            return `How many ${itemEmoji} in each group? There might be some left over!`;
        } else {
            return `Choose the number of ${itemEmoji} after dividing into equal groups:`;
        }
    }

	export function generateNewProblem() {
		const { newDivisor, newCorrectAnswer, newRemainder } = generateUniqueParameters();

		divisor = newDivisor;
		correctAnswer = newCorrectAnswer;
		remainder = newRemainder;
		dividend = divisor * correctAnswer + remainder;

		// Update the previous problem parameters
		previousProblem = { divisor, correctAnswer, remainder };

		generateOptions();
		selectedAnswer = null;
		showMessage = false;
		showAnswer = false;
		itemEmoji = getItemEmoji();
		title = getTitle();

		dividendItems = Array.from({ length: dividend }, (_, index) => ({
			id: index,
			value: itemEmoji,
			inDivisor: false
		}));
		divisorGroups = Array.from({ length: divisor }, () => []);

		// Reset the dividend container height
		dividendContainerHeight = '120px';
	}

	function generateOptions() {
		const optionSet = new Set([correctAnswer]);
		while (optionSet.size < 4) {
			let option;
			const rand = Math.random();
			if (rand < 0.3 && remainder > 0) {
				// Common mistake: including the remainder in the answer
				option = correctAnswer + 1;
			} else if (rand < 0.6) {
				// Another common mistake: subtracting instead of dividing
				option = Math.max(1, dividend - divisor);
			} else {
				// Random option
				option = getRandomNumber(Math.max(1, correctAnswer - 5), correctAnswer + 5);
			}
			if (option > 0) {
				optionSet.add(option);
			}
		}
		options = Array.from(optionSet).sort((a, b) => a - b);
	}

	function checkAnswer(answer) {
		selectedAnswer = answer;
		showMessage = true;
		showAnswer = true;
		if (answer === correctAnswer) {
			message = 'Correct! Well done!';
		} else {
			message = `Oops! The correct answer is ${correctAnswer}.`;
			if (remainder > 0) {
				message += ` (with a remainder of ${remainder})`;
			}
		}
		moveItemsToDivisorGroups();
	}

	function moveItemsToDivisorGroups() {
		// Calculate and set the current height before moving items
		const dividendContainer = document.querySelector('.dividend-container');
		if (dividendContainer) {
			dividendContainerHeight = `${dividendContainer.offsetHeight}px`;
		}
		let itemsMoved = 0;
		for (let i = 0; i < correctAnswer; i++) {
			for (let j = 0; j < divisor; j++) {
				if (itemsMoved < dividend - remainder) {
					dividendItems[itemsMoved].inDivisor = true;
					divisorGroups[j] = [...divisorGroups[j], dividendItems[itemsMoved]];
					itemsMoved++;
				}
			}
		}
		dividendItems = dividendItems.filter((item) => !item.inDivisor);
		divisorGroups = divisorGroups;
	}
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 500)
	});

	onMount(generateNewProblem);
</script>

<div class="division-container">
	<h2>{title}</h2>

	<div class="problem">
		<span>{dividend} ÷ {divisor} = ?</span>
	</div>

	<div class="visualization">
		<div class="dividend-container" style="min-height: {dividendContainerHeight}">
			<div class="dividend">
				{#each dividendItems as item (item.id)}
					<div out:send={{ key: item.id }} animate:flip={{ duration: 200 }} class="item">
						{item.value}
					</div>
				{/each}
			</div>
			{#if showMessage}
				<div class="message">
					{message}
				</div>
				<button class="next-problem" on:click={generateNewProblem}>
					Next Problem
				</button>
			{/if}
		</div>

		<div class="divisor">
			{#each divisorGroups as group, groupIndex}
				<div class="group">
					{#each group as item (item.id)}
						<div in:receive={{ key: item.id }} animate:flip={{ duration: 200 }} class="item">
							{item.value}
						</div>
					{/each}
				</div>
			{/each}
		</div>

		{#if showAnswer && remainder > 0}
			<div class="remainder" in:fade={{ delay: divisor * correctAnswer * 100 }}>
				<p>Remainder:</p>
				{#each Array.from({ length: remainder }) as _, i}
					<span class="item" in:fly={{ y: 50, delay: (divisor * correctAnswer + i) * 100 }}
						>{itemEmoji}</span
					>
				{/each}
			</div>
		{/if}
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

	<div class="answer"></div>
</div>

<style>
	.division-container {
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
		flex-direction: column;
		align-items: center;
		gap: 20px;
		margin-bottom: 20px;
	}

	.dividend {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 2px;
	}

	.divisor {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}

	.group {
		border: 2px dashed #ccc;
		border-radius: 10px;
		padding: 10px;
		width: 150px;
		min-height: 60px;
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	.item {
		font-size: 20px;
		width: 25px;
		height: 25px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.remainder {
		border-top: 2px solid #ccc;
		padding-top: 10px;
		text-align: center;
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

	.answer {
		min-height: 100px;
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
