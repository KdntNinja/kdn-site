<script>
  import Post from '$lib/components/post/Post.svelte';
  import { routes } from '$lib/routes';

  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';

  let auth;

  onMount(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = routes.LOGIN;
      }
    });
  });
</script>

<main>
  <Post />
</main>
