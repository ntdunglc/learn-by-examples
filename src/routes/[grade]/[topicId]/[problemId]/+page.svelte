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

    $: {
        const gradeData = mathTopics.find(g => g.grade === grade);
        if (gradeData) {
            topic = gradeData.topics.find(t => t.id === topicId);
            if (topic) {
                problems = topic.problems;
                selectedProblem = problems.find(p => p.id === problemId);
            }
        }

    }

    function generateNewProblem() {
        if (problemComponent && problemComponent.generateNewProblem) {
            problemComponent.generateNewProblem();
        }
    }
</script>

<div class="topic-view">
    <ProblemSidebar {grade} {topicId} {topic} {problems} selectedProblemId={problemId} />

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
    .topic-view {
        display: flex;
        height: 100vh;
    }

    .problem-area {
        flex-grow: 1;
        margin-left: 300px;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .problem-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #f0f0f0;
        border-bottom: 1px solid #ccc;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .problem-header h1 {
        margin: 0;
        font-size: 24px;
    }

    .problem-content {
        flex-grow: 1;
        overflow-y: auto;
        padding: 20px;
    }

    .new-problem-button {
        background-color: #ff9800;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
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
</style>