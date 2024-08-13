<script>
	import { fade } from 'svelte/transition';
	export let rows = 1;
	export let cols = 1;
	export let showSkipCounting = false;
	export let horizontalFactor = 1;
	export let verticalFactor = 1;

	function getSkipCountingNumber(index, factor) {
		return (index + 1) * factor;
	}
</script>

<div class="grid">
	{#each Array(rows) as _, rowIndex}
		<div class="row">
			{#each Array(cols) as _, colIndex}
				<div class="square">
					{#if showSkipCounting && (colIndex === cols - 1 || rowIndex === rows - 1)}
						<span class="skip-count" transition:fade>
							{colIndex === cols - 1
								? getSkipCountingNumber(rowIndex, verticalFactor)
								: getSkipCountingNumber(colIndex, horizontalFactor)}
						</span>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.grid {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.square {
		width: 30px;
		height: 30px;
		background-color: #4caf50;
		margin: 2px;
		border-radius: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.skip-count {
		position: absolute;
		font-size: 12px;
		font-weight: bold;
		color: white;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 2px 4px;
		border-radius: 3px;
	}
</style>
