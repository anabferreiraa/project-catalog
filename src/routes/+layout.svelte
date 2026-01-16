<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import AnnouncementBar from "$lib/Components/AnnouncementBar/AnnouncementBar.svelte";
	import BrandLogo from '$lib/Components/BrandLogo/BrandLogo.svelte';
	let { children } = $props();
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<AnnouncementBar messages= {["FRETE GRATIS PRA TODO O BRASIL",
    "10% OF NO PIX"]}/>
<BrandLogo/>
{@render children()}
