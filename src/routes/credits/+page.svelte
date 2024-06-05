<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { onMount } from "svelte";
    import { collection, getDocs, firestore } from "$lib/firebase";
    import { ScrollArea } from "$lib/components/ui/posts-scroll-box";
    import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";
    import type { Credit } from "$lib/models";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/routes";

    let credits: Credit[] = [];

    onMount(async () => {
        const creditsCollection = collection(firestore, "credits");
        const creditsSnapshot = await getDocs(creditsCollection);
        credits = creditsSnapshot.docs.map((doc) => ({ name: doc.id, role: doc.data().role }));
    });

    const goToHome = () => {
        goto(routes.INDEX);
    };

    async function fetchCredits() {
        const creditsCollection = collection(firestore, "credits");
        const creditsSnapshot = await getDocs(creditsCollection);
        const credits = creditsSnapshot.docs.map((doc) => ({ name: doc.id, role: doc.data().role }));

        let html = "";
        credits.forEach((credit) => {
            const roleParts = credit.role.split("\\");
            let rolesHtml = "";
            roleParts.forEach((rolePart) => {
                rolesHtml += `<li>${rolePart}</li>`;
            });

            html += `
                <div class="p-4 rounded-lg shadow-md">
                    <h2 class="font-medium text-2xl mb-2">${credit.name}</h2>
                    <hr class="mb-2" />
                    <ul class="text-lg">
                        ${rolesHtml}
                    </ul>
                </div>
            `;
        });

        const scrollBox = document.querySelector(".scroll-box");
        if (scrollBox) {
            scrollBox.innerHTML = html;
        }
    }

    fetchCredits();
</script>

<div class="svelte-scroll-area rounded-md justify-center p-4">
    <ScrollArea class="">
        <div class="p-4">
            {#each credits as credit (credit.name)}
                <Card class="p-4 rounded-lg shadow-md">
                    <h2 class="font-medium text-2xl mb-2">{credit.name}</h2>
                    <Separator class="mb-2" />
                    <p class="text-lg">
                        {#each credit.role.split("\\") as rolePart (rolePart)}
                            {rolePart}<br />
                        {/each}
                    </p>
                </Card>
            {/each}
        </div>
    </ScrollArea>
    <Button on:click="{goToHome}">Home</Button>
</div>

<style>
    .svelte-scroll-area {
        justify-content: center;
        align-items: center;
        width: 35%;
        height: 94vh;
        margin: auto;
    }
    @media (max-width: 768px) {
        .svelte-scroll-area {
            margin-top: 30px;
            width: 100%;
        }
    }
</style>
