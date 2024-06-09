<script lang="ts">
    import SidebarNav from "./(components)/sidebar-nav.svelte";
    import { Separator } from "$lib/components/new-york/ui/separator";
    import FormsLight from "$lib/img/forms-light.png";
    import FormsDark from "$lib/img/forms-dark.png";
    import FormsAuto from "$lib/img/forms-auto.png";
    import { routes } from "$lib/routes";
    import { Button } from "$lib/components/ui/button";

    const sidebarNavItems = [
        {
            title: "Profile",
            href: "/settings/profile/",
        },
        {
            title: "Appearance",
            href: "/settings/appearance/",
        },
    ];
</script>

<div class="md:hidden">
    <enhanced:img src="{FormsAuto}" alt="Forms" class="hidden dark:block"></enhanced:img>
    <enhanced:img src="{FormsLight}" alt="Forms" class="block dark:hidden"></enhanced:img>
    <enhanced:img src="{FormsDark}" alt="Forms" class="hidden dark:block"></enhanced:img>
</div>
<div class="hidden space-y-6 p-10 pb-16 md:block">
    <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">Manage your account settings.</p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="w-full lg:w-1/5">
            <SidebarNav items="{sidebarNavItems}" />
        </aside>
        <div class="flex-1 lg:max-w-2xl">
            <slot />
        </div>
    </div>
</div>
<div class="go-home-button">
    <Button on:click="{() => (window.location.href = routes.PAGES)}">Home</Button>
</div>

<style>
    .go-home-button {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }
    @media (max-width: 768px) {
        .go-home-button {
            right: 10px;
            bottom: 10px;
        }
    }
</style>
