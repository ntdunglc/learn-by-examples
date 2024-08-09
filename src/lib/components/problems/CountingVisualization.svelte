<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	export let maxCount = 5;

	const dispatch = createEventDispatcher();

	let objects = [];
	let numbers = [];
	let message = '';
	let isCorrect = false;
	let revealAnswer = false;
	let correctAnswer = 0;
	let currentIconSetName = '';
	let selectedNumber = null;

	const iconSets = {
		fruits: ['🍎', '🍌', '🍊', '🍇', '🍓', '🍍', '🍒', '🥝', '🥭', '🍉'],
		shapes: ['🔴', '🔶', '🔺', '🟦', '🟣', '⭐', '🔘', '🟠', '🟢', '🟨'],
		animals: ['🐶', '🐱', '🐰', '🐸', '🐵', '🦁', '🐘', '🦒', '🐧', '🦜'],
		instruments: ['🎸', '🎹', '🥁', '🎺', '🎻', '🪗', '🎷', '🪘', '🪕', '🔔'],
		softDrinks: ['🥤', '🧃', '🧉', '🧋', '🍹', '🍸', '🍶', '🧃', '🥛', '🍺'],
		foods: ['🍕', '🍔', '🌭', '🍟', '🌮', '🍣', '🍙', '🥐', '🥨', '🧇']
	};

	$: gridColumns = 10;
	$: boxSize = maxCount <= 5 ? 'large' : maxCount <= 20 ? 'medium' : 'small';

	function generateGrid(rows, cols) {
		return Array(rows)
			.fill()
			.map(() => Array(cols).fill(false));
	}

	function getRandomEmptyCell(grid) {
		const emptyCells = [];
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (!grid[i][j]) {
					emptyCells.push([i, j]);
				}
			}
		}
		if (emptyCells.length === 0) return null;
		return emptyCells[Math.floor(Math.random() * emptyCells.length)];
	}

	export const generateNewProblem = () => {
		correctAnswer = Math.floor(Math.random() * maxCount) + 1;
		currentIconSetName =
			Object.keys(iconSets)[Math.floor(Math.random() * Object.keys(iconSets).length)];
		const currentIconSet = iconSets[currentIconSetName];

		const gridRows = 5;
		const gridCols = 5;
		const grid = generateGrid(gridRows, gridCols);

		objects = [];
		for (let i = 0; i < correctAnswer; i++) {
			const cell = getRandomEmptyCell(grid);
			if (cell) {
				const [row, col] = cell;
				grid[row][col] = true;
				objects.push({
					type: currentIconSet[Math.floor(Math.random() * currentIconSet.length)],
					x: `${(col / (gridCols - 1)) * 80 + 10}%`,
					y: `${(row / (gridRows - 1)) * 80 + 10}%`
				});
			}
		}

		numbers = Array.from({ length: maxCount }, (_, i) => i + 1);
		message = '';
		isCorrect = false;
		revealAnswer = false;
		dispatch('problemGenerated');
	};

	onMount(generateNewProblem);

	function checkAnswer(selected) {
		selectedNumber = selected;
		isCorrect = selected === correctAnswer;
		revealAnswer = true;
		message = isCorrect
			? "Great job! That's correct!"
			: `Oops! The correct answer is ${correctAnswer}.`;
	}

	function playAgain() {
		generateNewProblem();
		revealAnswer = false;
		message = '';
		selectedNumber = null;
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<div class="counting-container">
	<div class="main-area">
		<h2>How many {capitalizeFirstLetter(currentIconSetName)} do you see?</h2>
		<div class="objects-area">
			{#each objects as object}
				<span
					class="object"
					style="left: {object.x}; top: {object.y};"
					transition:scale={{ duration: 300, easing: elasticOut }}>{object.type}</span
				>
			{/each}
		</div>
		<div class="number-grid" style="grid-template-columns: repeat({gridColumns}, 1fr);">
			{#each numbers as number}
				<button
					class="number-box {boxSize}"
					class:selected={number === selectedNumber}
					on:click={() => checkAnswer(number)}
					disabled={revealAnswer}
				>
					{number}
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
				<button class="play-again-button" on:click={playAgain}> Play Again! 🎮 </button>
			</div>
		{/if}
	</div>
</div>

<style>
	.counting-container {
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

	.objects-area {
		width: 100%;
		height: 300px;
		border: 3px solid #ffd700;
		border-radius: 15px;
		position: relative;
		margin-bottom: 20px;
		background-color: #f0f8ff;
		padding: 10px;
		box-sizing: border-box;
	}

	.object {
		position: absolute;
		font-size: 30px;
		transform: translate(-50%, -50%); /* Center the object on its position */
	}

	.number-grid {
		display: grid;
		gap: 8px;
		margin-top: 20px;
		justify-content: center;
		padding: 10px;
		background-color: #e9e9e9;
		border-radius: 10px;
	}

	.number-box {
		aspect-ratio: 1;
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
		padding: 0;
	}
	.number-box.selected {
		background-color: #ffd700; /* Gold color for the selected number */
		color: #000; /* Black text for better contrast */
		transform: scale(1.1); /* Slightly larger */
		box-shadow: 0 0 10px rgba(255, 215, 0, 0.7); /* Glow effect */
	}

	.number-box.large {
		font-size: 24px;
		max-width: 80px;
	}

	.number-box.medium {
		font-size: 16px;
		max-width: 40px;
	}

	.number-box.small {
		font-size: 14px;
		max-width: 35px;
	}

	.number-box:hover {
		transform: scale(1.05);
		background-color: #45a049;
	}

	.number-box:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.number-box:disabled.selected {
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
</style>
