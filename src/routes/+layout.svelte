<script>
  import { base } from '$app/paths';
</script>

<div class="app-container">
  <main>
    <slot />
  </main>
  <footer>
    Learn By Examples | Made by Dung Tri Nguyen
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  :global(body, html) {
    height: 100%;
    overflow: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  footer {
    background-color: #f8f8f8;
    padding: 0.5rem;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    font-size: 0.9rem;
    color: #333;
  }
</style>