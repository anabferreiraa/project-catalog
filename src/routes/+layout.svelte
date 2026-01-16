<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import AnnouncementBar from "$lib/Components/AnnouncementBar/AnnouncementBar.svelte";
	import AnnouncementData from "$cms/announcement-bar.json"
	import BrandBar from '$lib/Components/BrandBar/BrandBar.svelte';
	
	let { children } = $props();
	//images = {{ dir: '/image/brand/', name: '' , alt: '' }}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<AnnouncementBar messages = { AnnouncementData.AnnouncementBar } />
<BrandBar/>

{@render children()}
