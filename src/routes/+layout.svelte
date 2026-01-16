<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import AnnouncementBar from "$lib/Components/AnnouncementBar/AnnouncementBar.svelte";
	import AnnouncementData from "$cms/announcement-bar.json"
	import BrandLogo from '$lib/Components/BrandLogo/BrandLogo.svelte';
	let { children } = $props();
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<AnnouncementBar messages = { AnnouncementData.AnnouncementBar } />

<BrandLogo   />


{@render children()}
