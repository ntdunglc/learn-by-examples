<script>
    import { base } from '$app/paths';

    export let grade;
    export let topicId;
    export let topic;
    export let problems = [];
    export let selectedProblemId = null;
</script>

<aside class="problem-sidebar">
    <div class="sidebar-header">
        <a href="{base}/" class="home-link">🏠 Home</a>
    </div>
    <h2>{topic ? topic.name : ''}</h2>
    <ul>
        {#each problems as problem}
            <li class:selected={selectedProblemId === problem.id}>
                {#if problem.component}
                    <a href="{base}/{encodeURIComponent(grade)}/{encodeURIComponent(topicId)}/{problem.id}">
                        {problem.title}
                    </a>
                {:else}
                    <span class="non-link">{problem.title}</span>
                {/if}
            </li>
        {/each}
    </ul>
</aside>

<style>
    .problem-sidebar {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    .sidebar-header {
        margin-bottom: 20px;
    }

    .home-link {
        text-decoration: none;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        transition: color 0.3s;
    }

    .home-link:hover {
        color: #ff9800;
    }

    .problem-sidebar h2 {
        margin-top: 0;
        font-size: clamp(18px, 4vw, 24px);
    }

    .problem-sidebar ul {
        list-style-type: none;
        padding: 0;
        flex-grow: 1;
        margin: 0;
    }

    .problem-sidebar li {
        margin-bottom: 10px;
    }

    .problem-sidebar a {
        display: block;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        text-decoration: none;
        color: #0056b3;
        font-weight: 500;
        transition: color 0.3s, background-color 0.3s;
        font-size: clamp(14px, 3vw, 16px);
    }

    .problem-sidebar a:hover {
        color: #003d82;
        background-color: #f0f0f0;
    }

    .problem-sidebar li.selected a {
        font-weight: bold;
        background-color: #e6e6e6;
        color: #003d82;
    }

    .problem-sidebar .non-link {
        display: block;
        width: 100%;
        text-align: left;
        padding: 10px;
        color: #666;
        font-weight: normal;
        font-size: clamp(14px, 3vw, 16px);
    }

    @media (min-width: 768px) {
        .problem-sidebar {
            width: 300px;
            border-right: 1px solid #ccc;
        }
    }
</style>