<script>
	import { base } from '$app/paths';
	import mathTopics from '$lib/mathTopics.js';
</script>

<div class="home-container">
	<h1>Elementary Math Visualizations</h1>

	{#each mathTopics as grade}
		<section>
			<h2>{grade.grade}</h2>
			<ul>
				{#each grade.topics as topic}
                <li>
					{#if topic.problems.filter(problem => problem.component).length > 0}
							<a href="{base}/{encodeURIComponent(grade.grade)}/{encodeURIComponent(topic.id)}">
								{topic.name}
							</a>
                    {:else}
                        <span>{topic.name}</span>
                    {/if}
                </li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style>
	.home-container {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		color: #333;
		text-align: center;
	}

	h2 {
		color: #666;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 10px;
	}
</style>
