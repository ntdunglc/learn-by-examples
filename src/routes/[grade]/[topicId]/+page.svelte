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
  };
</script>

<div class="topic-view">
  <ProblemSidebar {grade} {topicId} {topic} {problems} />

  <main class="problem-area">
      <p>Select a problem to begin.</p>
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
      padding: 20px;
  }
</style>