<script>
	export let number = 0;
	export let otherNumber = 999;
	export let highlightNumber = -1;
	export let squareStyle = 'small'; // small or large

	$: hundreds = Math.floor(number / 100);
	$: tens = Math.floor((number % 100) / 10);
	$: ones = number % 10;

	$: maxHundreds = Math.max(Math.floor(otherNumber / 100), Math.floor(number / 100));
	$: maxTens = Math.max(Math.floor((otherNumber % 100) / 10), Math.floor((number % 100) / 10));
	$: maxOnes = Math.max(otherNumber % 10, number % 10);

	$: highlightOnes = highlightNumber % 10;
	$: highlightTens = Math.floor((highlightNumber % 100) / 10);
	$: highlightHundreds = Math.floor(highlightNumber / 100);

	$: borrowedTens = ones < highlightOnes ? 1 : 0;
	$: borrowedHundreds = tens - borrowedTens < highlightTens ? 1 : 0;

	function getHighlightSquareClass(placeValue, index) {
		// index is the square index in maxNumber grid
		if (highlightNumber < 0) return '';
		if (index >= number) return '';

		let indexOnes = index % 10;
		let indexTens = Math.floor((index % 100) / 10);
		let indexHundreds = Math.floor(index / 100);
		if (placeValue === 'ones') {
			if (indexOnes < highlightOnes) return 'highlight-ones';
		} else if (placeValue === 'tens') {
			// highlight the ones that we borrowed, this is the last ones of the last tens
			if (borrowedTens > 0 && indexTens == tens - 1) {
				if (9 - indexOnes < highlightOnes - ones) {
					return 'highlight-ones';
				}
			} else if (indexTens < highlightTens) return 'highlight-tens';
		} else if (placeValue === 'hundreds') {
			if (borrowedHundreds > 0 && indexHundreds == hundreds - 1) {
				if (9 - indexTens - borrowedTens < highlightTens - tens) return 'highlight-tens';
			} else if (indexHundreds < highlightHundreds) return 'highlight-hundreds';
		}

		return 'remainder';
	}
</script>

<div class="stacking-blocks {squareStyle}">
	<div class="place-value hundreds">
		{#each Array(maxHundreds) as _, i}
			<div class="grid hundred" class:empty={i >= hundreds}>
				{#each Array(10) as _, row}
					<div class="row">
						{#each Array(10) as _, col}
							<div
								class="square {getHighlightSquareClass('hundreds', i * 100 + row * 10 + col)}"
								data-num={i * 100 + row * 10 + col}
							></div>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="place-value tens">
		<div class="grid ten">
			{#each Array(tens) as _, col}
				<div class="column">
					{#each Array(10) as _, row}
						<div
							class="square {getHighlightSquareClass('tens', hundreds * 100 + col * 10 + row)}"
							data-num={hundreds * 100 + col * 10 + row}
						></div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="place-value ones">
		<div class="grid one">
			<div class="row">
				{#each Array(maxOnes) as _, i}
					<div
						class="square {getHighlightSquareClass('ones', hundreds * 100 + tens * 10 + i)}"
						class:empty={i >= ones}
						data-num={hundreds * 100 + tens * 10 + i}
					></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.stacking-blocks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	.place-value {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	.grid {
		display: flex;
		gap: 2px;
		padding: 2px;
	}

	.hundred {
		flex-direction: column;
	}

	.ten {
		flex-direction: row;
	}

	.row,
	.column {
		display: flex;
		gap: 2px;
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}

	.square {
		width: 10px;
		height: 10px;
		background-color: #3498db;
		border-radius: 2px;
	}

    .small .square {
		width: 10px;
		height: 10px;
	}

	.large .square {
		width: 20px;
		height: 20px;
	}

	.small .hundred {
		width: 114px;
		height: 114px;
	}

	.large .hundred {
		width: 224px;
		height: 224px;
	}

	.small .ten {
		width: 114px;
		height: 114px;
	}

	.large .ten {
		width: 224px;
		height: 224px;
	}

	.small .one {
		height: 14px;
	}

	.large .one {
		height: 24px;
	}

	.highlight-ones {
		background-color: #e74c3c;
	}

	.highlight-tens {
		background-color: #f39c12;
	}

	.highlight-hundreds {
		background-color: #9b59b6;
	}

	.borrowed {
		background-color: #95a5a6;
	}

	.remainder {
		background-color: #2ecc71;
	}

	.empty .square,
	.empty.square {
		background-color: transparent;
	}
</style>
