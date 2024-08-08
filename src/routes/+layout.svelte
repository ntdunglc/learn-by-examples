<script>
    import { base } from '$app/paths';
  </script>
  
  <div class="app-container">
    <main>
      <slot />
    </main>
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
  </style>