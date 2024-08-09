<script>
    export let hours = 0;
    export let minutes = 0;
    export let size = 200;

    $: hourAngle = (hours % 12 + minutes / 60) * 30;
    $: minuteAngle = minutes * 6;

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
</script>

<svg width={size} height={size} viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="98" fill="white" stroke="black" stroke-width="2"/>
    
    <!-- Hour marks -->
    {#each Array(12) as _, i}
        {@const angle = i * 30}
        {@const start = polarToCartesian(100, 100, 90, angle)}
        {@const end = polarToCartesian(100, 100, 98, angle)}
        <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black" stroke-width="2"/>
    {/each}

    <!-- Hour hand -->
    <line 
        x1="100" 
        y1="100" 
        x2={100 + 50 * Math.sin(hourAngle * Math.PI / 180)} 
        y2={100 - 50 * Math.cos(hourAngle * Math.PI / 180)} 
        stroke="black" 
        stroke-width="4" 
        stroke-linecap="round"
    />

    <!-- Minute hand -->
    <line 
        x1="100" 
        y1="100" 
        x2={100 + 70 * Math.sin(minuteAngle * Math.PI / 180)} 
        y2={100 - 70 * Math.cos(minuteAngle * Math.PI / 180)} 
        stroke="black" 
        stroke-width="2" 
        stroke-linecap="round"
    />

    <!-- Center dot -->
    <circle cx="100" cy="100" r="3" fill="black"/>
</svg>

<style>
    svg {
        display: block;
        margin: 0 auto;
    }
</style>