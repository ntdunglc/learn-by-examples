<script>
  import { onMount } from 'svelte';
  import mathTopics from '$lib/mathTopics.js';
  import ProblemSidebar from '$lib/components/ProblemSidebar.svelte';

  export let data;

  $: ({ grade, topicId } = data);
  let topic = null;
  let problems = [];

  $: {
    const gradeData = mathTopics.find(g => g.grade === grade);
    if (gradeData) {
      topic = gradeData.topics.find(t => t.id === topicId);
      if (topic) {
        problems = topic.problems;
      }
    }
  }
</script>

<div class="topic-view">
  <aside class="sidebar">
    <ProblemSidebar {grade} {topicId} {topic} {problems} />
  </aside>

  <main class="problem-area">
    <p>Select a problem to begin.</p>
  </main>
</div>

<style>
  .topic-view {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .sidebar {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    overflow-y: auto;
  }

  .problem-area {
    display: none;
    flex-grow: 1;
    padding: 20px;
  }

  @media (min-width: 768px) {
    .topic-view {
      flex-direction: row;
    }

    .sidebar {
      width: 300px;
      height: 100vh;
    }

    .problem-area {
      display: flex;
      flex-direction: column;
      margin-left: 300px;
    }
  }
</style>