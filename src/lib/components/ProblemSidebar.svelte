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
                <a href="{base}/{encodeURIComponent(grade)}/{encodeURIComponent(topicId)}/{problem.id}">
                    {problem.title}
                </a>
            </li>
        {/each}
    </ul>
</aside>

<style>
    .problem-sidebar {
        width: 300px;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #ccc;
        padding: 20px;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top: 0;
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
    }

    .problem-sidebar ul {
        list-style-type: none;
        padding: 0;
        flex-grow: 1;
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
        padding: 5px;
        text-decoration: none;
        color: inherit;
    }

    .problem-sidebar li.selected a {
        font-weight: bold;
        background-color: #e6e6e6;
    }
</style>