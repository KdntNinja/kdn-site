<script lang="ts">
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import { addDoc, collection } from 'firebase/firestore';
  import { firestore } from '$lib/firebase';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import Toaster from '$lib/components/ui/sonner/sonner.svelte';
import { Label } from '$lib/components/ui/label/index.js';


  let title = '';
  let content = '';
  let isLoading = false;
  let message = '';

  const createPost = async () => {
    isLoading = true;
    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        title,
        content,
      });
      message = 'Post created successfully';
      title = '';
      content = '';
    } catch (e) {
      message = 'Error creating post';
    }
    isLoading = false;
  };
</script>

<div>
  <Drawer.Root>
    <Drawer.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline">Create Post</Button>
    </Drawer.Trigger>
    <Drawer.Content>
      <div class="mx-auto w-full max-w-sm centered">
        <Drawer.Header>
          <Drawer.Title>Create a new post</Drawer.Title>
        </Drawer.Header>
        <div class="p-4 pb-0">
<Label for="title">Title</Label>
          <Textarea id="title"
            bind:value={title}
            placeholder="Title"
            class="mb-4 small-textarea"
          />
<Label for="content">Content</Label>
          <Textarea id="content"
            bind:value={content}
            placeholder="Content"
            class="mb-4 text-lg"
          />
        </div>
        <Drawer.Footer>
          <div style="display: flex; align-items: center;">
            <Button
              on:click={createPost}
              aria-label="Create Post"
              class="mr-4 font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {#if isLoading}
                Posting...
              {:else if title && content}
                Create Post
              {:else if title}
                Fill in the content
              {:else if content}
                Fill in the title
              {:else}
                Fill in the title and content
              {/if}
            </Button>
            <Drawer.Close asChild let:builder>
              <Button builders={[builder]} variant="outline">Cancel</Button>
            </Drawer.Close>
          </div>
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Root>

  {#if message}
    <Toaster>
      {message}
    </Toaster>
  {/if}
</div>

<style>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  .p-4 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
