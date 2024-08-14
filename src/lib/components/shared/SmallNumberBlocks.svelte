<script>
    export let number = 0;
    export let highlightNumber = -1; // -1 is not highlighting

    $: tens = Math.floor(number / 10);
    $: ones = number % 10;

    function getHighlightSquareClass(index) {
        if (highlightNumber < 0) return '';
        if (index >= number) return '';

        if (index < highlightNumber) {
            return 'highlight-ones';
        }

        return 'remainder';
    }
</script>

<div class="small-number-blocks">
    <div class="blocks">
        {#each Array(tens) as _, row}
            <div class="row">
                {#each Array(10) as _, col}
                    <div
                        class="square {getHighlightSquareClass(row * 10 + col)}"
                        data-num={row * 10 + col}
                    ></div>
                {/each}
            </div>
        {/each}
        <div class="row">
            {#each Array(ones) as _, col}
            <div
                class="square {getHighlightSquareClass(tens * 10 + col)}"
                data-num={tens * 10 + col}
            ></div>
        {/each}
        </div>
    </div>
</div>

<style>
    .small-number-blocks {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .label {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        color: #666;
    }

    .blocks {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        max-width: 120px;
    }

    .square {
        width: 30px;
        height: 30px;
        background-color: #3498db;
        border-radius: 3px;
    }

    .break {
        flex-basis: 100%;
        height: 0;
    }

    .highlight-ones {
        background-color: #e74c3c;
    }

    .remainder {
        background-color: #2ecc71;
    }

    .empty {
        background-color: transparent;
        border: 1px solid #ccc;
    }

	.row {
		display: flex;
		gap: 2px;
		flex-direction: row;
	}
</style>