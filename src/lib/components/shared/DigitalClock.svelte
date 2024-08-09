<script>
    export let hours = 0;
    export let minutes = 0;
    export let size = 'medium';

    $: displayHours = (hours % 12 || 12).toString().padStart(2, '0');
    $: paddedHours = displayHours[0] === '0' ? `&nbsp;${displayHours[1]}` : displayHours;
    $: displayMinutes = minutes.toString().padStart(2, '0');
    $: period = hours < 12 ? 'AM' : 'PM';
</script>

<div class="digital-clock {size}">
    {@html paddedHours}:{displayMinutes} {period}
</div>

<style>
    .digital-clock {
        font-family: 'Digital', monospace;
        background-color: #000;
        color: #0f0;
        padding: 10px;
        border-radius: 5px;
        display: inline-block;
    }

    .small {
        font-size: 1rem;
    }

    .medium {
        font-size: 1.5rem;
    }

    .large {
        font-size: 3rem;
    }
</style>