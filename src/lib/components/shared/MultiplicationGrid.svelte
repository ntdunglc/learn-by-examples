<script>
    export let rows = 1;
    export let cols = 1;
    export let showSkipCounting = false;
    export let horizontalFactor = 1;
    export let verticalFactor = 1;
  
    function getSkipCountingNumber(index, factor) {
      return (index + 1) * factor;
    }
  </script>
  
  <div class="grid" style="--grid-rows: {rows}; --grid-cols: {cols};">
    {#each Array(rows) as _, rowIndex}
      <div class="row">
        {#each Array(cols) as _, colIndex}
          <div class="square">
            {#if showSkipCounting && (colIndex === cols - 1 || rowIndex === rows - 1)}
              <span class="skip-count" transition:fade>
                {colIndex === cols - 1 ? getSkipCountingNumber(rowIndex, verticalFactor) : getSkipCountingNumber(colIndex, horizontalFactor)}
              </span>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
  
  <style>
    .grid {
      display: grid;
      grid-template-rows: repeat(var(--grid-rows), auto);
      grid-template-columns: repeat(var(--grid-cols), auto);
      gap: 2px;
    }
  
    .square {
      width: 30px;
      height: 30px;
      background-color: #4caf50;
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