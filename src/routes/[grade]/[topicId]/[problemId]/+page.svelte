<script>
    import { onMount } from 'svelte';
    import mathTopics from '$lib/mathTopics.js';
    import ProblemSidebar from '$lib/components/ProblemSidebar.svelte';

    export let data;

    $: ({ grade, topicId, problemId } = data);
    let topic = null;
    let problems = [];
    let selectedProblem = null;
    let problemComponent;
    let isSidebarOpen = false;

    $: {
        const gradeData = mathTopics.find(g => g.grade === grade);
        if (gradeData) {
            topic = gradeData.topics.find(t => t.id === topicId);
            if (topic) {
                problems = topic.problems;
                selectedProblem = problems.find(p => p.id === problemId);
            }
        }
        isSidebarOpen = false;
    }

    function generateNewProblem() {
        if (problemComponent && problemComponent.generateNewProblem) {
            problemComponent.generateNewProblem();
        }
    }

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

<div class="problem-view">
    <button class="sidebar-toggle" on:click={toggleSidebar}>
        {isSidebarOpen ? '✖' : '☰'}
    </button>

    <aside class="sidebar" class:open={isSidebarOpen}>
        <ProblemSidebar {grade} {topicId} {topic} {problems} selectedProblemId={problemId} />
    </aside>

    <main class="problem-area">
        {#if selectedProblem}
            <div class="problem-header">
                <h1>{selectedProblem.title}</h1>
                <button class="new-problem-button" on:click={generateNewProblem}>
                    New Problem 🎲
                </button>
            </div>
            <div class="problem-content">
                {#if selectedProblem.component}
                    {#each [selectedProblem] as problem (problem.id)}
                        <svelte:component 
                            this={problem.component} 
                            {...problem.props}
                            bind:this={problemComponent}
                        />
                    {/each}
                {:else}
                    <p>Visualization for this problem type is not yet implemented.</p>
                {/if}
            </div>
        {:else}
            <p>Problem not found.</p>
        {/if}
    </main>
</div>

<style>
    .problem-view {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        position: relative;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
        transition: left 0.3s ease-in-out;
        z-index: 1000;
        overflow-y: auto;
    }

    .sidebar.open {
        left: 0;
    }

    .sidebar-toggle {
        top: 10px;
        left: 10px;
        z-index: 1001;
        background-color: #ff9800;
        border: none;
        color: white;
        padding: 10px;
        font-size: 20px;
        cursor: pointer;
        border-radius: 5px;
    }

    .problem-area {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding-top: 5px;
    }

    .problem-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #f0f0f0;
        border-bottom: 1px solid #ccc;
        z-index: 999;
    }

    .problem-header h1 {
        margin: 0;
        font-size: clamp(18px, 4vw, 24px);
    }

    .problem-content {
        flex-grow: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .new-problem-button {
        background-color: #ff9800;
        border: none;
        color: white;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: clamp(14px, 3vw, 16px);
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition: background-color 0.3s, transform 0.1s;
    }

    .new-problem-button:hover {
        background-color: #e68a00;
        transform: scale(1.05);
    }

    .new-problem-button:active {
        transform: scale(0.95);
    }

    @media (min-width: 768px) {
        .problem-view {
            flex-direction: row;
        }

        .sidebar {
            position: static;
            width: 300px;
            height: 100%;
        }

        .sidebar-toggle {
            display: none;
        }

        .problem-area {
            padding-top: 0;
        }
    }
</style>