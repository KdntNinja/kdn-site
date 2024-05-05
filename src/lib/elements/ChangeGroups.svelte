<script lang="ts">
  import * as DropdownMenu from "../components/ui/dropdown-menu/index.js";
  import { Button } from "../components/ui/button/index.js";
  import { updateDoc, doc } from "firebase/firestore";
  import { firestore } from "$lib/firebase";

  import { getAuth } from "firebase/auth";

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  export const changeGroup = async (userId: string, newGroup: "default" | "family") => {
      await updateDoc(doc(firestore, "users", userId), {
          group: newGroup,
      });
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline">Change Group</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Change Group</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
    <DropdownMenu.Item on:click={() => currentUserId && changeGroup(currentUserId, "default")}>
        <span>Default</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => currentUserId && changeGroup(currentUserId, "family")}>
        <span>Family</span>
    </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>